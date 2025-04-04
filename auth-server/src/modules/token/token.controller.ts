import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../constants";

type VerifyRequest = Request<
  {},
  any,
  {
    accessToken: string;
  },
  {}
>;

export default class SignInController {
  static async verify(req: VerifyRequest, res: Response) {
    const { accessToken } = req.body;

    try {
      if (accessToken) {
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        res.send();
      } else {
        res.status(401).json({
          message: "Missing access token",
        });
      }
    } catch (e) {
      res.status(401).json({
        error: e,
        message: "Unable to verify token",
      });
    }
  }

  static async refresh(req: Request, res: Response) {
    const refreshToken =
      req.signedCookies["refresh_token"] ?? req.cookies["refresh_token"];

    if (!refreshToken) {
      res.status(401).send("");
      return;
    }

    try {
      const payload = <jwt.UserIDJwtPayload>(
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
      );

      const updatedAccessToken = jwt.sign(
        { userId: payload.userId },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" } // Short-lived access token
      );

      const updatedRefreshToken = jwt.sign(
        { userId: payload.userId },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "5m" } // Long-lived refresh token
      );

      res.json({
        accessToken: updatedAccessToken,
        refreshToken: updatedRefreshToken,
      });
    } catch (e) {
      console.log(e);
      res.status(401).json(e);
    }
  }
}
