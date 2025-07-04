import { Request, Response } from "express";
import SessionService from "../../services/session/session.service";
import { ONE_DAY, ONE_HOUR } from "../../constants";

type SessionRequest = Request<{}, any, {}, {}>;

export default class SessionController {
  static async validate(req: SessionRequest, res: Response) {
    const accessToken = req.headers.authorization?.split(" ")?.[1];

    if (accessToken) {
      const isValid = await SessionService.getIsValid(accessToken);

      if (isValid) {
        res.status(200).send();
        return;
      }
    }

    res.status(401).send();
  }

  static async refresh(req: SessionRequest, res: Response) {
    const currentRefreshToken = req.cookies["skidoodle.refresh_token"];

    if (currentRefreshToken) {
      try {
        const { accessToken, refreshToken } = await SessionService.refresh(
          currentRefreshToken
        );

        res.cookie("skidoodle.access_token", accessToken, {
          maxAge: ONE_HOUR * 1000,
        });
        res.cookie("skidoodle.refresh_token", refreshToken, {
          maxAge: ONE_DAY * 1000,
        });

        res.status(200).send();
        return;
      } catch {}
    }

    res.status(401).send();
  }

  static async getCurrentUser(req: SessionRequest, res: Response) {
    const currentAccessToken = req.cookies["skidoodle.access_token"];

    if (currentAccessToken) {
      try {
        const currentUser = await SessionService.getCurrentUser(
          currentAccessToken
        );

        res.status(200).json(currentUser);
        return;
      } catch {}
    }

    res.status(401).send();
  }
}
