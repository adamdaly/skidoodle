import express, { Request } from "express";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { MongoServerError } from "mongodb";
import { authenticate } from "./middleware/authenticate";
import { mongoService } from "./services/mongo";
import { createHashedPassword } from "./services/password";

const app = express();
app.use(cookieParser("secret"));
mongoService.connect();
// create application/json parser
const jsonParser = bodyParser.json();
app.use(jsonParser);

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

const mongodbErrors = {
  DUPLICATE: 11_000,
};

const port = process.env.PORT;

app.get("/", authenticate, (req, res) => {
  res.send("Hello Skidoodle Auth");
});

type RegisterRequest = Request<
  {},
  any,
  {
    username: string;
    password: string;
  },
  {}
>;

app.post("/register", async (req: RegisterRequest, res) => {
  const { username, password } = req.body;

  const payload = {
    username,
    password: await createHashedPassword(password),
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };

  try {
    const result = await mongoService
      .db()
      .collection("users")
      .insertOne(payload);

    res.status(201).json({
      id: result.insertedId,
      username,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      isDeleted: payload.isDeleted,
    });
  } catch (e) {
    if (e instanceof MongoServerError && e.code === mongodbErrors.DUPLICATE) {
      res.status(409).json({
        message: e.message,
        error: e,
      });
    } else {
      res.status(500).send({
        message: "Unknown error",
        error: e,
      });
    }
  }
});

type AuthorizeRequest = Request<
  {},
  any,
  {
    username: string;
    password: string;
  },
  {}
>;

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? "your-access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? "your-refresh-secret";

app.post("/sign-in", async (req: AuthorizeRequest, res) => {
  const { username, password } = req.body;

  const user = await mongoService
    .db()
    .collection("users")
    .findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const accessToken = jwt.sign(
    { userId: user._id, username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" } // Short-lived access token
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "20m" } // Long-lived refresh token
  );

  // Optionally store refresh token in DB for revocation
  await mongoService.db().collection("authCodes").insertOne({
    token: refreshToken,
    userId: user._id,
  });

  res
    .status(200)
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      signed: true,
    })
    .json({ accessToken });
});

type VerifyRequest = Request<
  {},
  any,
  {},
  {
    access_token: string;
  }
>;

app.get("/verify", async (req: VerifyRequest, res) => {
  const accessToken = req.query.access_token;

  if (accessToken && jwt.verify(accessToken, ACCESS_TOKEN_SECRET)) {
    res.send();
  } else {
    res.status(401).json({
      message: "",
    });
  }
});

app.get("/refresh", async (req, res) => {
  const refreshToken = req.signedCookies["refresh_token"];

  if (!refreshToken) {
    res.status(401).send("");
  }

  try {
    const payload = <jwt.UserIDJwtPayload>(
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    );

    const accessToken = jwt.sign(
      { userId: payload.userId },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" } // Short-lived access token
    );

    const updatedRefreshToken = jwt.sign(
      { userId: payload.userId },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "5m" } // Long-lived refresh token
    );

    res
      .status(200)
      .cookie("refresh_token", updatedRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        signed: true,
      })
      .json({ accessToken });
  } catch (e) {
    res.status(401).json(e);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
