import { AuthSession } from "aws-amplify/auth";
import { AuthServiceServer as AuthService } from "@/custom/services/auth/server";
import { API } from "./api";

export class ServerAPI extends API {
  authService: AuthService;
  constructor() {
    super();
    this.authService = new AuthService();
  }

  async fetchAccessToken(): Promise<AuthSession> {
    return this.authService.fetchAuthSession();
  }
}

export const serverInstance = new ServerAPI();
