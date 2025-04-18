import { Animation, Scene } from "@/custom/types";
import { useCallback, useState } from "react";

export const useAnimationContextLogic = (animation: Animation) => {
  console.log("animation.Scene", animation.Scene);
  const [localScenes, setLocalScenes] = useState(animation.Scene);

  const onCreateScene = useCallback((scene: Scene) => {
    setLocalScenes((currentScenes) => [...currentScenes, scene]);
  }, []);

  return {
    id: animation.id,
    name: animation.name,
    width: animation.width,
    height: animation.height,
    framerate: animation.framerate,
    scenes: localScenes,
    onCreateScene,
  } as const;
};
