"use client";

import { memo, useMemo } from "react";
import { useFramesContext } from "@/custom/components/frames";
import { Thumbnail } from "@/custom/components/thumbnail";
import { Animation, Scene as SceneType } from "@/custom/types";
import { CreateScene } from "../create-scene";
import { useAnimation } from "../context";

export type SceneProps = {
  scene: SceneType;
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
  animation: Animation;
};

export const Scenes = memo(() => {
  const { width, height, scenes } = useAnimation();

  return (
    <div>
      <ul
        data-testid="list-scenes"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6"
      >
        {scenes.map((scene) => (
          <Scene key={scene.id} {...{ scene, width: width, height: height }} />
        ))}
      </ul>
      <div>
        <CreateScene />
      </div>
    </div>
  );
});

Scenes.displayName = "Scenes";
