import { AxiosRequestConfig } from "axios";
import { Animation, Frame, Scene } from "@/custom/types";
import { clientInstance } from "../client-api";

export type PostSceneRequest = Pick<Scene, "animationid" | "name" | "index">;

export const postScene = (
  body: PostSceneRequest,
  config?: AxiosRequestConfig
) => clientInstance.post<Scene, PostSceneRequest>("/scenes", body, config);

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
    "/animations",
    body,
    config
  );

export const deleteAnimation = (id: number, config?: AxiosRequestConfig) =>
  clientInstance.deleteRequest(`/animations/${id}`, config);

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

  return clientInstance.post<PostFrameResponse, FormData>("/frames", formData, {
    ...config,
    headers: {
      ...config?.headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteFrame = (id: number, config?: AxiosRequestConfig) =>
  clientInstance.deleteRequest<Frame, void>(`/frames/${id}`, config);

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
    `/frames/${id}`,
    formData,
    config
  );
};

export type GetAnimationResponse = Animation;

export const getAnimation = (
  animationid: number,
  config?: AxiosRequestConfig
) =>
  clientInstance.get<GetAnimationResponse>(
    `/animations/${animationid}`,
    config
  );

export type GetSceneResponse = Scene;

export const getScene = (sceneid: number, config?: AxiosRequestConfig) =>
  clientInstance.get<GetSceneResponse>(`/scenes/${sceneid}`, config);
