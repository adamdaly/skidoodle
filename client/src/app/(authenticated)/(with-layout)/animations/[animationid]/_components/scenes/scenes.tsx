"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { useFramesContext } from "@/custom/components/frames";
import { Thumbnail } from "@/custom/components/thumbnail";
import { Animation, Scene as Scenetype } from "@/custom/types";
// import { CreateScene } from "../create-scene";

export type SceneProps = {
  scene: Scenetype;
} & Pick<Animation, "width" | "height">;

export const Scene = memo(({ scene, width, height }: SceneProps) => {
  const frames = useFramesContext();

  const sceneFrames = useMemo(() => {
    return scene.Frame.map((frame) => frame.filename).reduce(
      (frameData, currentFrame) => {
        if (frames[currentFrame]) {
          frameData.push(frames[currentFrame]);
        }
        return frameData;
      },
      [] as string[]
    );
  }, [frames, scene.Frame]);

  return (
    <li>
      <Thumbnail
        key={scene.id}
        {...{
          frames: sceneFrames,
          width,
          height,
          href: `/scenes/${scene.id}`,
          label: scene.name,
        }}
      />
    </li>
  );
});

Scene.displayName = "Scene";

export type ScenesProps = {
  scenes: Scenetype[];
};

export const Scenes = memo(({ scenes }: ScenesProps) => {
  const [localScenes, setLocalScenes] = useState(scenes);

  // const onCreate = useCallback((scene: Scene) => {
  //   setLocalScenes((currentScenes) => [...currentScenes, scene]);
  // }, []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {localScenes.map((scene) => (
          <Scene key={scene.id} {...scene} />
        ))}
      </ul>
      {/* <CreateScene onCreate={onCreate} /> */}
    </>
  );
});

Scenes.displayName = "Scenes";
