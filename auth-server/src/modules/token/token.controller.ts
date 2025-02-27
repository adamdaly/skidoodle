import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../constants";

type VerifyRequest = Request<
  {},
  any,
  {},
  {
    access_token: string;
  }
>;

export default class SignInController {
  static async verify(req: VerifyRequest, res: Response) {
    const accessToken = req.query.access_token;

    if (accessToken && jwt.verify(accessToken, ACCESS_TOKEN_SECRET)) {
      res.send();
    } else {
      res.status(401).json({
        message: "Unable to verify token",
      });
    }
  }

  static async refresh(req: Request, res: Response) {
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
  }
}
