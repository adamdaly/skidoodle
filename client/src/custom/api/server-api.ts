import { AuthSession } from "aws-amplify/auth";

import { API } from "./api";
import { authServiceServer } from "../services/auth/server";
import { SERVER_URL } from "../constants";

const baseURL = SERVER_URL.endsWith("/")
  ? SERVER_URL.substring(0, SERVER_URL.length - 1)
  : SERVER_URL;

export class ServerAPI extends API {
  async fetchAccessToken(): Promise<AuthSession> {
    return authServiceServer.fetchAuthSession();
  }
}

export const serverInstance = new ServerAPI(baseURL);
