import { mongoService } from "../mongo";

export type GetUser = {
  username: string;
};

export class UserService {
  static getUser(payload: GetUser) {
    return mongoService.db().collection("users").findOne(payload);
  }
}
