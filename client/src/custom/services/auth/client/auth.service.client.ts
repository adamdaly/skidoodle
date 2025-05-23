import { NODE_ENV } from "@/custom/constants";
import { AuthServiceClientBase } from "../auth.service.base";
import {
  ConfirmationRegistrationArgs,
  SignUpArgs,
  SignInArgs,
} from "../auth.service.types";
import type AuthServiceClientProd from "./auth.service.client.prod";
import type AuthServiceClientLocal from "./auth.service.client.local";

class AuthServiceClient implements AuthServiceClientBase {
  constructor(
    private readonly service: AuthServiceClientLocal | AuthServiceClientProd
  ) {}

  async signUp(args: SignUpArgs) {
    return this.service.signUp(args);
  }

  async confirmSignUp(args: ConfirmationRegistrationArgs) {
    return this.service.confirmSignUp(args);
  }
  async signIn(args: SignInArgs) {
    return this.service.signIn(args);
  }
  async signOut() {
    return this.service.signOut();
  }
  async fetchAuthSession() {
    return this.service.fetchAuthSession();
  }
}

const Service =
  NODE_ENV === "development"
    ? await import("./auth.service.client.local").then(
        (module) => module.default
      )
    : await import("./auth.service.client.prod").then(
        (module) => module.default
      );

export const authServiceClient = new AuthServiceClient(new Service());
