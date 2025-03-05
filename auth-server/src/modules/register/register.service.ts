import { mongoService } from "../../services/mongo/mongo.service";

type RegisterUser = {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export default class RegisterService {
  static register(payload: RegisterUser) {
    return mongoService.db().collection("users").insertOne(payload);
  }
}
