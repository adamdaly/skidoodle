import { NODE_ENV } from "@/custom/constants";
import { AuthServiceClientBase } from "../auth.service.base";
import {
  ConfirmationRegistrationArgs,
  SignUpArgs,
  SignInArgs,
} from "../auth.service.types";
import AuthServiceClientProd from "./auth.service.client.prod";
import AuthServiceClientLocal from "./auth.service.client.local";

export class AuthServiceClient implements AuthServiceClientBase {
  Service!: AuthServiceClientLocal | AuthServiceClientProd;

  private async getService() {
    if (this.Service) {
      return this.Service;
    }

    const Service =
      NODE_ENV === "development"
        ? await import("./auth.service.client.local").then(
            (Service) => Service.default
          )
        : await import("./auth.service.client.prod").then(
            (Service) => Service.default
          );

    this.Service = new Service();

    return this.Service;
  }

  async signUp(args: SignUpArgs) {
    const service = await this.getService();
    return service.signUp(args);
  }

  async confirmSignUp(args: ConfirmationRegistrationArgs) {
    const service = await this.getService();
    return service.confirmSignUp(args);
  }
  async signIn(args: SignInArgs) {
    const service = await this.getService();
    return service.signIn(args);
  }
  async signOut() {
    const service = await this.getService();
    return service.signOut();
  }
  async fetchAuthSession() {
    const service = await this.getService();
    return service.fetchAuthSession();
  }
}
