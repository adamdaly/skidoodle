import { AuthSession } from "aws-amplify/auth";
import { authServiceClient } from "@/custom/services/auth/client";
import { API } from "./api";

export class ClientAPI extends API {
  async fetchAccessToken(): Promise<AuthSession> {
    return await authServiceClient.fetchAuthSession();
  }
}

export const clientInstance = new ClientAPI();
