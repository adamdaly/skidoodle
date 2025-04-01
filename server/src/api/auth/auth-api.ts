import { AxiosRequestConfig } from 'axios';
import { post } from '../api';

export type RegisterPayload = {
  username: string;
  password: string;
};

export type RegisterResponse = {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: false;
};

export type SignInPayload = {
  username: string;
  password: string;
};

export type SignInResponse = {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const register = (payload: RegisterPayload) =>
  post<RegisterResponse>('http://auth-server:3000/register', payload);

export const signIn = (payload: SignInPayload) =>
  post<SignInResponse>('http://auth-server:3000/sign-in', payload);

export const verify = (accessToken: string, config?: AxiosRequestConfig) =>
  post('http://auth-server:3000/token/verify', { accessToken }, config);

export const refresh = (refreshToken: string, config?: AxiosRequestConfig) =>
  post<RefreshResponse>(
    'http://auth-server:3000/token/refresh',
    { refreshToken },
    config,
  );
