"use client";
import { memo } from "react";
import Link from "next/link";
import { Header } from "@/custom/modules/header";
import { Footer } from "@/custom/components/footer";
import { SceneProvider } from "@/custom/components/scene/components/context";

import {
  Canvas,
  Controls,
  Frames,
  Timeline,
  Tools,
  Info,
  SceneWrapper,
} from "@/custom/components/scene";
import { Animation, Scene as SceneType } from "@/custom/types";

export type SceneProps = {
  scene: SceneType;
  animation: Animation;
};
export const Scene = memo(({ animation, scene }: SceneProps) => {
  const header = () => (
    <Header>
      <span className="">
        <Link href={`/animations/${animation.id}`}>
          <span className="inline-block mx-2 font-bold">/</span>
          <span className="font-bold underline">{animation.name}</span>
        </Link>
        <span className="inline-block mx-2 font-bold">/</span>
        {scene.name}
      </span>
    </Header>
  );

  return (
    <SceneProvider {...{ animation, scene }}>
      <SceneWrapper
        {...{
          Header: header,
          Controls,
          Tools,
          Canvas,
          Info,
          Timeline,
          Frames,
          aspectRatio: animation.width / animation.height,
        }}
      />
      <Footer />
    </SceneProvider>
  );
});

Scene.displayName = "Scene";
