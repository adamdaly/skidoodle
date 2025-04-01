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
      { expiresIn: "1h" } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "24h" } // Long-lived refresh token
    );

    res.status(200).json({ id: user._id, username, accessToken, refreshToken });
  }
}
