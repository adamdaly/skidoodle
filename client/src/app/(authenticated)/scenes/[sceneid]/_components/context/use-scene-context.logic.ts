import { Animation, Scene } from "@/custom/types";
import { useCanvas } from "./hooks/use-canvas";
import { useFrames } from "./hooks/use-frames";
import { useShared } from "./hooks/use-shared";
import { useTools } from "./hooks/use-tools";

export const useSceneContextLogic = (animation: Animation, scene: Scene) => {
  const shared = useShared(animation, scene);

  return {
    ...shared,
    ...useCanvas(shared),
    ...useFrames(shared),
    ...useTools(shared),
  } as const;
};
