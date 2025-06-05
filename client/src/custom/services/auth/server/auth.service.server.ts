import { NODE_ENV } from "@/custom/constants";
import { AuthServiceServerBase } from "../auth.service.base";
import type AuthServiceServerLocal from "./auth.service.server.local";
import type AuthServiceServerProd from "./auth.service.server.prod";

class AuthServiceServer implements AuthServiceServerBase {
  constructor(
    private readonly service: AuthServiceServerLocal | AuthServiceServerProd
  ) {}

  async fetchAuthSession() {
    return this.service.fetchAuthSession();
  }

  async getIsAuthenticated() {
    return this.service.getIsAuthenticated();
  }
}

const Service =
  NODE_ENV === "development"
    ? await import("./auth.service.server.local").then(
        (module) => module.default
      )
    : await import("./auth.service.server.prod").then(
        (module) => module.default
      );

export const authServiceServer = new AuthServiceServer(new Service());
