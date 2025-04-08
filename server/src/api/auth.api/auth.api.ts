import { AxiosRequestConfig } from 'axios';
import { post } from '../api';

export const verify = (accessToken: string, config?: AxiosRequestConfig) =>
  post('http://auth-server:3000/token/verify', { accessToken }, config);
