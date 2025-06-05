import { AuthSession } from "aws-amplify/auth";
import { cookies } from "next/headers";
import { AuthServiceServerBase } from "../auth.service.base";

import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/custom/utils/amplify-server-utils";

export default class AuthServiceServerProd implements AuthServiceServerBase {
  async fetchAuthSession(): Promise<AuthSession> {
    return runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        return await fetchAuthSession(contextSpec);
      },
    });
  }

  async getIsAuthenticated(): Promise<boolean> {
    try {
      const session = await this.fetchAuthSession();

      return (
        session.tokens?.accessToken !== undefined &&
        session.tokens?.idToken !== undefined
      );
    } catch {
      return false;
    }
  }
}
