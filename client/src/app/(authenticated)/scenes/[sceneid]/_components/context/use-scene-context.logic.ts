import { Animation, Scene } from "@/custom/types";
import { useFrames } from "./hooks/use-frames";
import { useCanvas } from "./hooks/use-canvas";

export const useSceneContextLogic = (animation: Animation, scene: Scene) => {
  return {
    animation,
    scene,
    ...useCanvas(animation, scene),
    ...useFrames(scene),
  } as const;
};
