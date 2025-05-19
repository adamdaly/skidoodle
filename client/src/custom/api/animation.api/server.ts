import { AxiosRequestConfig } from "axios";
import { Animation, Scene } from "@/custom/types";
import { serverInstance } from "../server-api";

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

export const getAnimations = (config?: GetAnimationsConfig) =>
  serverInstance.get<GetAnimationsResponse>("/user/animations", config);

export type GetAnimationResponse = Animation;

export const getAnimation = (
  animationid: number,
  config?: AxiosRequestConfig
) =>
  serverInstance.get<GetAnimationResponse>(
    `/animations/${animationid}`,
    config
  );

type AnimationWithMetadata = Animation & {
  metadata: {
    type: "Animation";
  };
};

type SceneWithMetadata = Scene & {
  metadata: {
    type: "Scene";
  };
};

export type GetRecentsResponse = (AnimationWithMetadata | SceneWithMetadata)[];

export const getRecents = (config?: AxiosRequestConfig) =>
  serverInstance.get<GetRecentsResponse>("/user/recents", config);

export type GetSceneResponse = Scene;

export const getScene = (sceneid: number, config?: AxiosRequestConfig) =>
  serverInstance.get<GetSceneResponse>(`/scenes/${sceneid}`, config);
