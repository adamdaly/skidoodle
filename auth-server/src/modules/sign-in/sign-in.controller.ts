import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserService } from "../../services/user/user.service";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../constants";

type SignInRequest = Request<
  {},
  any,
  {
    username: string;
    password: string;
  },
  {}
>;

export default class SignInController {
  static async signIn(req: SignInRequest, res: Response) {
    const { username, password } = req.body;

    const user = await UserService.getUser({ username });

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

    res.status(200).cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      signed: true,
    });

    console.log(res.getHeaders());
    res.json({ accessToken });
  }
}
