import { AuthSession } from "aws-amplify/auth";
import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://server:3000",
});

export abstract class API {
  private readonly axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://server:3000",
  });

  private accessToken?: string;

  constructor() {
    this.axiosInstance.interceptors.request.use(async (config) => {
      const accessToken = await this.getAccessToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  }

  abstract fetchAccessToken(): Promise<AuthSession>;

  async getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    const session = await this.fetchAccessToken();
    this.accessToken = session.tokens?.accessToken.toString();
    return this.accessToken;
  }

  get<Response = unknown>(url: string, config: AxiosRequestConfig<void> = {}) {
    return this.axiosInstance.get<Response>(url, config);
  }

  post<Response = unknown, Body = unknown>(
    url: string,
    body: Body,
    config: AxiosRequestConfig<Body> = {}
  ) {
    return this.axiosInstance.post<Response>(url, body, config);
  }

  put<Response = unknown, Body = unknown>(
    url: string,
    body: Body,
    config: AxiosRequestConfig<Body> = {}
  ) {
    return this.axiosInstance.put<Response>(url, body, config);
  }

  patch<Response = unknown, Body = unknown>(
    url: string,
    body: Body,
    config: AxiosRequestConfig<Body> = {}
  ) {
    return this.axiosInstance.patch<Response>(url, body, config);
  }

  deleteRequest<Response = unknown, Body = unknown>(
    url: string,
    config: AxiosRequestConfig<Body> = {}
  ) {
    return this.axiosInstance.delete<Response>(url, config);
  }
}
