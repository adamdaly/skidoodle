import { AuthSession } from "aws-amplify/auth";
import { AuthServiceClient as AuthService } from "@/custom/services/auth/client";
import { API } from "./api";

export class ClientAPI extends API {
  authService: AuthService;
  constructor() {
    super();
    this.authService = new AuthService();
  }
  async fetchAccessToken(): Promise<AuthSession> {
    return await this.authService.fetchAuthSession();
  }
}

export const clientInstance = new ClientAPI();
