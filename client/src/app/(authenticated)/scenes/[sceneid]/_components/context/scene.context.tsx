"use client";
import { createContext, ReactNode } from "react";
import { Animation, Scene } from "@/custom/types";
import { useSceneContextLogic } from "./use-scene-context.logic";

export const SceneContext = createContext<
  ReturnType<typeof useSceneContextLogic> | undefined
>(undefined);

export type SceneProviderProps = {
  children: ReactNode;
  animation: Animation;
  scene: Scene;
};

export const SceneProvider = ({
  children,
  animation,
  scene,
}: SceneProviderProps) => {
  const value = useSceneContextLogic(animation, scene);

  return (
    <SceneContext.Provider {...{ value }}>{children}</SceneContext.Provider>
  );
};
