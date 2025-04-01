import { AxiosRequestConfig } from "axios";
import { Animation, Scene } from "@/custom/types";
import { get, post } from "../api";

export type GetAnimationsResponse = Animation[];

export const getAnimations = (config?: AxiosRequestConfig) =>
  get<GetAnimationsResponse>("http://localhost:3000/animations", config);

export type GetAnimationResponse = Animation;

export const getAnimation = (
  animationid: string,
  config?: AxiosRequestConfig
) =>
  get<GetAnimationResponse>(
    `http://localhost:3000/animations/${animationid}`,
    config
  );

type WithType<T> = T & {
  metadata: {
    type: "Animation" | "Scene";
  };
};

export type GetRecentsResponse = (WithType<Animation> | WithType<Scene>)[];

export const getRecents = (config?: AxiosRequestConfig) =>
  get<GetRecentsResponse>("http://localhost:3000/recents", config);

export type GetSceneResponse = Scene;

export const getScene = (sceneid: string, config?: AxiosRequestConfig) =>
  get<GetSceneResponse>(`http://localhost:3000/scenes/${sceneid}`, config);

export type GetSceneRequest = Pick<Scene, "animationid" | "name" | "index">;

export const postScene = (body: GetSceneRequest, config?: AxiosRequestConfig) =>
  post<GetSceneResponse, GetSceneRequest>(
    "http://localhost:3000/scenes",
    body,
    config
  );
