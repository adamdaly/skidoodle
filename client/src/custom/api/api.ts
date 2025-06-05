import { AuthSession } from "aws-amplify/auth";
import axios, { AxiosRequestConfig } from "axios";

export abstract class API {
  private readonly axiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL,
    });

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
    const session = await this.fetchAccessToken();
    return session.tokens?.accessToken.toString();
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
