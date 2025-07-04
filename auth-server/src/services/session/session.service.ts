import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { mongoService } from "../mongo";
import {
  ACCESS_TOKEN_SECRET,
  ONE_HOUR,
  REFRESH_TOKEN_SECRET,
} from "../../constants";

export type ReadSessionPayload = {
  id: ObjectId;
};

export type GetIsValid = {
  id: ObjectId;
};

export default class SessionService {
  static create(session: JwtPayload) {
    return mongoService.db().collection("sessions").insertOne(session);
  }

  static read(session: ReadSessionPayload) {
    return mongoService
      .db()
      .collection("sessions")
      .findOne(new ObjectId(session.id));
  }

  static async refresh(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as JwtPayload;

    return await this.generateTokens(payload.sub);
  }

  static async generateTokens(sub?: string) {
    const now = Math.floor(Date.now());
    const expiresIn = now + ONE_HOUR;

    const basePayload: JwtPayload = {
      iat: now,
      iss: "skidoodle-auth",
      aud: "skidoodle",
      sub,
    };

    const session = await SessionService.create({
      expiresIn,
    });

    const accessToken = jwt.sign(
      {
        ...basePayload,
        session: session.insertedId,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn,
      }
    );

    const refreshToken = jwt.sign(
      {
        ...basePayload,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: now + 24 * 60 * 60,
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  static async getIsValid(accessToken: string) {
    const payload = jwt.decode(accessToken) as JwtPayload;

    if (payload?.session) {
      const session = await this.read({ id: payload.session });

      if (session?.expiresIn) {
        const expiresIn = session.expiresIn;
        const now = Date.now() / 1000;
        return now < expiresIn;
      }
    }

    return false;
  }

  static async getCurrentUser(accessToken: string) {
    const payload = jwt.decode(accessToken) as JwtPayload;

    if (!payload.sub) {
      throw new Error("Missing User Id");
    }

    const user = await mongoService
      .db()
      .collection("users")
      .findOne(new ObjectId(payload.sub));

    if (!user) {
      throw new Error("Unknown User");
    }

    return {
      username: user.username,
      userId: user._id,
    };
  }
}
