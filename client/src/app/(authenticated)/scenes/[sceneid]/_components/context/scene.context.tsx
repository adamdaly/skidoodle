"use client";
import { createContext, ReactNode } from "react";
import { Scene } from "@/custom/types";
import { useSceneContextLogic } from "./use-scene-context.logic";

export const SceneContext = createContext<
  ReturnType<typeof useSceneContextLogic> | undefined
>(undefined);

export type SceneProviderProps = {
  children: ReactNode;
  scene: Scene;
};

export const SceneProvider = ({ children, scene }: SceneProviderProps) => {
  const value = useSceneContextLogic(scene);

  return (
    <SceneContext.Provider {...{ value }}>{children}</SceneContext.Provider>
  );
};
