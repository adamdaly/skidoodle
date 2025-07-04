import { Animation, CollabSession, Scene } from "@/custom/types";
import {
  useCanvas,
  useFrames,
  useShared,
  useTools,
  useCollaboration,
} from "@/custom/components/scene/hooks";

export const useSceneContextLogic = (
  animation: Animation,
  scene: Scene,
  collabSession: CollabSession | null
) => {
  const shared = useShared(animation, scene, collabSession);

  return {
    ...shared,
    ...useCanvas(shared),
    ...useFrames(shared),
    ...useTools(shared),
    ...useCollaboration(shared),
  } as const;
};
