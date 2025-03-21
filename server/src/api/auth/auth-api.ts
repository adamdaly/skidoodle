import { get, post } from '../api';

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
  accessToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const register = (payload: RegisterPayload) =>
  post<RegisterResponse>('http://auth-server:3000/register', payload);

export const signIn = (payload: SignInPayload) =>
  post<SignInResponse>('http://auth-server:3000/sign-in', payload);

export const verify = (accessToken: string) =>
  get(`http://auth-server:3000/token/verify?access_token=${accessToken}`);

export const refresh = () =>
  get<RefreshResponse>('http://auth-server:3000/token/refresh');
