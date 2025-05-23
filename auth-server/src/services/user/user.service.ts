import { ObjectId } from "mongodb";
import { mongoService } from "../mongo";

export type GetUser = {
  username: string;
};

export type ConfirmRegistration = {
  id: ObjectId;
};

export type GetIsSessionValid = {
  id: ObjectId;
};

export class UserService {
  static getUser(payload: GetUser) {
    return mongoService.db().collection("users").findOne(payload);
  }

  static async confirmRegistration(payload: ConfirmRegistration) {
    return mongoService
      .db()
      .collection("users")
      .updateOne(
        {
          _id: payload.id,
        },
        {
          $set: {
            isActive: true,
          },
        }
      );
  }
}
