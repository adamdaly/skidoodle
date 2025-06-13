import { AuthSession } from "aws-amplify/auth";
import { authServiceClient } from "@/custom/services/auth/client";
import { API } from "./api";
import { CLIENT_SERVER_URL } from "../constants";

const baseURL = CLIENT_SERVER_URL.endsWith("/")
  ? CLIENT_SERVER_URL.substring(0, CLIENT_SERVER_URL.length - 1)
  : CLIENT_SERVER_URL;

export class ClientAPI extends API {
  async fetchAccessToken(): Promise<AuthSession> {
    return await authServiceClient.fetchAuthSession();
  }
}

export const clientInstance = new ClientAPI(baseURL);
