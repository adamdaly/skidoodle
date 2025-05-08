import { fetchAuthSession } from "aws-amplify/auth/server";
import { AuthSession } from "aws-amplify/auth";
import { cookies } from "next/headers";

import { runWithAmplifyServerContext } from "../utils/amplify-server-utils";
import { API } from "./api";

export class ServerAPI extends API {
  constructor() {
    super();
  }

  async fetchAccessToken(): Promise<AuthSession> {
    return await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        return await fetchAuthSession(contextSpec);
      },
    });
  }
}

export const serverInstance = new ServerAPI();
