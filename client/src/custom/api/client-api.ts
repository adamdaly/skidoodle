import { AuthSession, fetchAuthSession } from "aws-amplify/auth";
import { API } from "./api";

export class ClientAPI extends API {
  constructor() {
    super();
  }
  async fetchAccessToken(): Promise<AuthSession> {
    return await fetchAuthSession();
  }
}

export const clientInstance = new ClientAPI();
