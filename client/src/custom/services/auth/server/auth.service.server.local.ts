import axios, { isAxiosError } from "axios";
import { AuthSession } from "aws-amplify/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { AuthServiceServerBase } from "../auth.service.base";

const axiosInstance = axios.create({ baseURL: "http://auth-server:3000" });

export default class AuthServiceServerLocal implements AuthServiceServerBase {
  async fetchAuthSession(): Promise<AuthSession> {
    const session = {} as AuthSession;

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("skidoodle.access_token")?.value;

    if (accessToken) {
      const cachedAccessToken = accessToken;
      const toString = () => cachedAccessToken;

      session.tokens = {
        accessToken: {
          payload: jwt.decode(accessToken) as JwtPayload,
          toString,
        },
      };
    }
    return session;
  }

  async getIsAuthenticated() {
    const session = await this.fetchAuthSession();

    if (session.tokens?.accessToken) {
      try {
        const response = await axiosInstance.get("/session/validate", {
          headers: {
            Authorization: `Bearer ${session.tokens.accessToken.toString()}`,
          },
        });

        if (response.status === 200) {
          return true;
        }
      } catch (e) {
        if (isAxiosError(e)) {
          if (e.status === 401) {
            try {
              await axiosInstance.get("/session/refresh");
              return true;
            } catch {}
          }
        }
      }
    }

    return false;
  }
}
