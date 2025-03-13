/* istanbul ignore file */
import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
});

export const get = <Response = unknown>(
  url: string,
  config: AxiosRequestConfig<void> = {},
) => axiosInstance.get<Response>(url, config);

export const post = <Response = unknown, Body = unknown>(
  url: string,
  body: Body,
  config: AxiosRequestConfig<Body> = {},
) => axiosInstance.post<Response>(url, body, config);

export const put = <Response = unknown, Body = unknown>(
  url: string,
  body: Body,
  config: AxiosRequestConfig<Body> = {},
) => axiosInstance.put<Response>(url, body, config);

export const patch = <Response = unknown, Body = unknown>(
  url: string,
  body: Body,
  config: AxiosRequestConfig<Body> = {},
) => axiosInstance.patch<Response>(url, body, config);

export const deleteRequest = <Response = unknown, Body = unknown>(
  url: string,
  config: AxiosRequestConfig<Body> = {},
) => axiosInstance.delete<Response>(url, config);
