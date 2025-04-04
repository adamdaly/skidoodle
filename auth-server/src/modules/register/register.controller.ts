import { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import { PasswordService } from "../../services/password";
import { mongodbErrors } from "../../services/mongo/mongo.service";
import RegisterService from "./register.service";

type RegisterRequest = Request<
  {},
  any,
  {
    username: string;
    password: string;
  },
  {}
>;

export default class RegisterController {
  static async register(req: RegisterRequest, res: Response) {
    const { username, password } = req.body;

    if (!PasswordService.validatePassword(password)) {
      res.status(400).send({ message: "Password failed validation" });
      return;
    }

    const payload = {
      username,
      password: await PasswordService.createHashedPassword(password),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };

    try {
      const result = await RegisterService.register(payload);

      res.status(201).json({
        id: result.insertedId,
        username,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        isDeleted: payload.isDeleted,
      });
    } catch (e) {
      if (e instanceof MongoServerError && e.code === mongodbErrors.DUPLICATE) {
        res.status(409).json({
          message: "This user already exists",
          error: e,
        });
      } else {
        res.status(500).send({
          message: "Unknown error",
          error: e,
        });
      }
    }
  }
}
