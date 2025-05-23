import { AuthSession } from "aws-amplify/auth";

import { API } from "./api";
import { authServiceServer } from "../services/auth/server";

export class ServerAPI extends API {
  constructor() {
    super();
  }

  async fetchAccessToken(): Promise<AuthSession> {
    return authServiceServer.fetchAuthSession();
  }
}

export const serverInstance = new ServerAPI();
