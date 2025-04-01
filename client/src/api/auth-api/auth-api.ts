import { AxiosRequestConfig } from "axios";
import { post } from "../api";

export type RegisterBody = {
  username: string;
  password: string;
};

export type RegisterResponse = {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export const postRegister = (body: RegisterBody, config?: AxiosRequestConfig) =>
  post<RegisterResponse, RegisterBody>(
    "http://localhost:3000/register",
    body,
    config
  );

export type SignInBody = {
  username: string;
  password: string;
};

export type SignInResponse = {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
};

export const postSignIn = (body: SignInBody, config?: AxiosRequestConfig) =>
  post<SignInResponse, SignInBody>(
    "http://localhost:3004/api/auth",
    body,
    config
  );

export const postTokenVerify = (
  accessToken: string,
  config?: AxiosRequestConfig
) =>
  post<void, { accessToken: string }>(
    "http://localhost:3002/token/verify",
    { accessToken },
    config
  );

export type TokenRefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const postTokenRefresh = (
  refreshToken: string,
  config?: AxiosRequestConfig
) =>
  post<TokenRefreshResponse, { refreshToken: string }>(
    "http://localhost:3002/token/refresh",
    { refreshToken },
    config
  );
