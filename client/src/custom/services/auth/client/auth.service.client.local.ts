import axios from "axios";
import {
  AuthSession,
  ConfirmSignUpOutput,
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
  accessToken?: string;
  refreshToken?: string;

  constructor() {
    this.accessToken = Cookies.get("skidoodle.access_token");
    this.refreshToken = Cookies.get("skidoodle.refresh_token");
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
    const response = await axiosInstance.post<SignInResponse>("/sign-in", args);

    this.accessToken = response.data.accessToken;
    this.refreshToken = response.data.refreshToken;

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

    if (this.accessToken) {
      const cachedAccessToken = this.accessToken;
      const toString = () => cachedAccessToken;

      session.tokens = {
        accessToken: {
          payload: jwt.decode(this.accessToken) as JwtPayload,
          toString,
        },
      };
    }
    return session satisfies AuthSession;
  }
}
