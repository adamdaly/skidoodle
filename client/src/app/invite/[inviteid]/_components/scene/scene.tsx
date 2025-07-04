"use client";
import { memo, use, useCallback } from "react";
import {
  Canvas,
  Controls,
  Frames,
  Timeline,
  Tools,
  Info,
  SceneProvider,
  SceneWrapper,
} from "@/custom/components/scene";
import { useInvite } from "../context";

export const Scene = memo(() => {
  const { data, collabSession } = useInvite();

  const { scene, animation } = use(data);

  const Header = useCallback(() => <div />, []);

  return (
    <SceneProvider {...{ animation, scene, collabSession }}>
      <SceneWrapper
        {...{
          Header,
          Controls,
          Tools,
          Canvas,
          Info,
          Timeline,
          Frames,
          aspectRatio: animation.width / animation.height,
        }}
      />
    </SceneProvider>
  );
});

Scene.displayName = "Scene";
