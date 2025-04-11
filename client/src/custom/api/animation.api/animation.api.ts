import { AxiosRequestConfig } from "axios";

import { Animation, Scene } from "@/custom/types";
import { get, post } from "../api";

export type GetAnimationsResponse = Animation[];
export type GetAnimationsParams = {
  sceneTake?: number;
  sceneSkip?: number;
  sceneSortOrder?: "asc" | "desc";
  frameTake?: number;
  frameSkip?: number;
  frameSortOrder?: "asc" | "desc";
};

interface GetAnimationsConfig extends AxiosRequestConfig {
  params?: GetAnimationsParams;
}

export const getAnimations = (config?: AxiosRequestConfig) =>
  get<GetAnimationsResponse>("http://server:3000/", config);

export type GetAnimationResponse = Animation;

export const getAnimation = (
  animationid: number | string,
  config?: GetAnimationsConfig
) =>
  get<GetAnimationResponse>(
    `http://server:3000/animations/${animationid}`,
    config
  );

type WithType<T> = T & {
  metadata: {
    type: "Animation" | "Scene";
  };
};

export type GetRecentsResponse = (WithType<Animation> | WithType<Scene>)[];

export const getRecents = (config?: AxiosRequestConfig) =>
  get<GetRecentsResponse>("http://server:3000/recents", config);

export type GetSceneResponse = Scene;

export const getScene = (sceneid: number, config?: AxiosRequestConfig) =>
  get<GetSceneResponse>(`http://server:3000/scenes/${sceneid}`, config);

export type PostSceneRequest = Pick<Scene, "animationid" | "name" | "index">;

export const postScene = (
  body: PostSceneRequest,
  config?: AxiosRequestConfig
) =>
  post<GetSceneResponse, PostSceneRequest>(
    "http://localhost:3000/scenes",
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
  post<PostAnimationResponse, PostAnimationRequest>(
    "http://localhost:3000/animations",
    body,
    config
  );
