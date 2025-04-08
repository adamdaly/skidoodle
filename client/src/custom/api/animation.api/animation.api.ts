import axios, { AxiosRequestConfig } from "axios";
import { Animation, Frame, Scene } from "@/custom/types";
import { get, post } from "../api";

export type GetAnimationsResponse = Animation[];

export const getAnimations = (config?: AxiosRequestConfig) =>
  get<GetAnimationsResponse>("http://server:3000/", config);

export type GetAnimationResponse = Animation;

export const getAnimation = (
  animationid: string,
  config?: AxiosRequestConfig
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

// export const postScene = (
//   body: PostSceneRequest,
//   config?: AxiosRequestConfig
// ) =>
//   post<GetSceneResponse, PostSceneRequest>(
//     "http://localhost:3000/scenes",
//     body,
//     config
//   );

// export type PostFrameRequest = {
//   file: File;
//   length: number;
//   index: number;
//   sceneid: number;
// };

// export type PostFrameResponse = Frame;

// export const postFrame = (
//   body: PostFrameRequest,
//   config?: AxiosRequestConfig
// ) => {
//   const formData = new FormData();

//   formData.append("file", body.file);
//   formData.append("length", body.length.toString());
//   formData.append("index", body.index.toString());
//   formData.append("sceneid", body.sceneid.toString());

//   return post<PostFrameResponse, FormData>(
//     "http://localhost:3000/frames",
//     formData,
//     {
//       ...config,
//       headers: {
//         ...config?.headers,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
// };

// export type PostGetFramesRequest = {
//   frames: string[];
// };

// export const getFrames = (frames: string[], config?: AxiosRequestConfig) =>
//   axios.post("http://localhost:3003/frames", { frames }, config);
