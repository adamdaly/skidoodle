import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "../../services/user/user.service";
import { ONE_DAY, ONE_HOUR } from "../../constants";
import SessionService from "../../services/session/session.service";

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

    const { accessToken, refreshToken } = await SessionService.generateTokens(
      user._id as unknown as string
    );

    res.cookie("skidoodle.access_token", accessToken, {
      maxAge: ONE_HOUR * 1000,
    });
    res.cookie("skidoodle.refresh_token", refreshToken, {
      maxAge: ONE_DAY * 1000,
    });

    res.status(200).send();
  }
}
