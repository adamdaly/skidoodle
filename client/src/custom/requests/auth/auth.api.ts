import axios, { AxiosRequestConfig } from "axios";

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
  axios.post<RegisterResponse, RegisterBody>("/api/register", body, config);

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
  axios.post<SignInResponse, SignInBody>("/api/sign-in", body, config);
