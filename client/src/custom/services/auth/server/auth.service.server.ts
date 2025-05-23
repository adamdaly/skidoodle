import { NODE_ENV } from "@/custom/constants";
import { AuthServiceServerBase } from "../auth.service.base";
import AuthServiceServerLocal from "./auth.service.server.local";
import AuthServiceServerProd from "./auth.service.server.prod";

export class AuthServiceServer implements AuthServiceServerBase {
  Service!: AuthServiceServerLocal | AuthServiceServerProd;

  private async getService() {
    if (this.Service) {
      return this.Service;
    }

    const Service =
      NODE_ENV === "development"
        ? await import("./auth.service.server.local").then(
            (Service) => Service.default
          )
        : await import("./auth.service.server.prod").then(
            (Service) => Service.default
          );

    this.Service = new Service();

    return this.Service;
  }

  async fetchAuthSession() {
    const service = await this.getService();
    return service.fetchAuthSession();
  }

  async getIsAuthenticated() {
    const service = await this.getService();
    return service.getIsAuthenticated();
  }
}
