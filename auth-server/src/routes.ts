import { Express } from "express";
import register from "./modules/register";
import signIn from "./modules/sign-in";
import token from "./modules/token";

export default function routes(server: Express) {
  server.use("/", register);
  server.use("/", signIn);
  server.use("/token", token);
}
