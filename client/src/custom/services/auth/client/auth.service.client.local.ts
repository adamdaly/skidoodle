import axios from "axios";
import {
  AuthSession,
  ConfirmSignUpOutput,
  GetCurrentUserOutput,
  SignInOutput,
  SignUpOutput,
} from "aws-amplify/auth";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthServiceClientBase } from "../auth.service.base";
import {
  ConfirmationRegistrationArgs,
  SignInArgs,
  SignUpArgs,
} from "../auth.service.types";

type RegisterResponse = {
  createdAt: string;
  id: string;
  isDeleted: boolean;
  updatedAt: string;
  username: string;
};

type SignInResponse = {
  accessToken: string;
  refreshToken: string;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

export default class AuthServiceClientLocal implements AuthServiceClientBase {
  getTokens() {
    return {
      accessToken: Cookies.get("skidoodle.access_token"),
      refreshToken: Cookies.get("skidoodle.refresh_token"),
    };
  }

  async signUp(args: SignUpArgs) {
    const response = await axiosInstance.post<RegisterResponse>(
      "/register",
      args
    );

    return {
      isSignUpComplete: false,
      userId: response.data.id,
      nextStep: {
        signUpStep: "CONFIRM_SIGN_UP",
        codeDeliveryDetails: {},
      },
    } satisfies SignUpOutput;
  }

  async confirmSignUp(args: ConfirmationRegistrationArgs) {
    await axiosInstance.post<RegisterResponse>("/register/confirm", args);

    return {
      isSignUpComplete: true,
      nextStep: {
        signUpStep: "DONE",
      },
    } satisfies ConfirmSignUpOutput;
  }

  async signIn(args: SignInArgs) {
    await axiosInstance.post<SignInResponse>("/sign-in", args);

    return {
      isSignedIn: true,
      nextStep: {
        signInStep: "DONE",
      },
    } satisfies SignInOutput;
  }

  async signOut() {
    Cookies.remove("skidoodle.access_token");
    Cookies.remove("skidoodle.refresh_token");
  }

  async fetchAuthSession() {
    const session = {} as AuthSession;

    const { accessToken } = this.getTokens();
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
    return session satisfies AuthSession;
  }

  async getCurrentUser(): Promise<GetCurrentUserOutput> {
    const response = await axiosInstance.get<GetCurrentUserOutput>(
      "/session/get-current-user"
    );
    return response.data;
  }
}
