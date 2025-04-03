"use client";

import { Scene } from "@/custom/types";
import { memo, useCallback, useState } from "react";
import { CreateScene } from "../create-scene";
import Link from "next/link";

export type ScenesProps = {
  scenes: Scene[];
};

export const Scenes = memo(({ scenes }: ScenesProps) => {
  const [localScenes, setLocalScenes] = useState(scenes);

  const onCreate = useCallback((scene: Scene) => {
    setLocalScenes((currentScenes) => [...currentScenes, scene]);
  }, []);

  return (
    <>
      <ul>
        {localScenes.map((scene) => (
          <li key={scene.id}>
            <Link href={`/scenes/${scene.id}`}>{scene.name}</Link>
          </li>
        ))}
      </ul>
      <CreateScene onCreate={onCreate} />
    </>
  );
});

Scenes.displayName = "Scenes";
