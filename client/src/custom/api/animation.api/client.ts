import { AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/custom/constants";
import { Animation, Frame, Scene } from "@/custom/types";
import { clientInstance } from "../client-api";

export type PostSceneRequest = Pick<Scene, "animationid" | "name" | "index">;

export const postScene = (
  body: PostSceneRequest,
  config?: AxiosRequestConfig
) =>
  clientInstance.post<Scene, PostSceneRequest>(
    `${SERVER_URL}/scenes`,
    body,
    config
  );

export type PostFrameRequest = {
  file: File;
  length: number;
  index: number;
  sceneid: number;
};

export type PostAnimationRequest = {
  name: string;
  width: number;
  height: number;
  framerate: number;
};

export type PostAnimationResponse = Animation;

export const postAnimation = (
  body: PostAnimationRequest,
  config?: AxiosRequestConfig
) =>
  clientInstance.post<PostAnimationResponse, PostAnimationRequest>(
    `${SERVER_URL}/animations`,
    body,
    config
  );

export const deleteAnimation = (id: number, config?: AxiosRequestConfig) =>
  clientInstance.deleteRequest(`${SERVER_URL}/animations/${id}`, config);

export type PostFrameResponse = Frame;

export const postFrame = (
  body: PostFrameRequest,
  config?: AxiosRequestConfig
) => {
  const formData = new FormData();

  formData.append("file", body.file);
  formData.append("length", body.length.toString());
  formData.append("index", body.index.toString());
  formData.append("sceneid", body.sceneid.toString());

  return clientInstance.post<PostFrameResponse, FormData>(
    `${SERVER_URL}/frames`,
    formData,
    {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteFrame = (id: number, config?: AxiosRequestConfig) =>
  clientInstance.deleteRequest<Frame, void>(
    `${SERVER_URL}/frames/${id}`,
    config
  );

export type PatchFrameRequest = {
  file?: File;
  length?: number;
  index?: number;
};

export const patchFrame = (
  id: number,
  body: PatchFrameRequest,
  config?: AxiosRequestConfig
) => {
  const formData = new FormData();

  if (body.file) {
    formData.append("file", body.file);
  }

  if (typeof body.length === "number") {
    formData.append("length", body.length.toString());
  }

  if (typeof body.index === "number") {
    formData.append("index", body.index.toString());
  }

  return clientInstance.patch<Frame, FormData>(
    `${SERVER_URL}/frames/${id}`,
    formData,
    config
  );
};
