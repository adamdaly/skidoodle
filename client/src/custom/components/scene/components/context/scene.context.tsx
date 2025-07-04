"use client";
import { createContext, ReactNode } from "react";
import { Animation, CollabSession, Scene } from "@/custom/types";
import { useSceneContextLogic } from "./use-scene-context.logic";

export const SceneContext = createContext<
  ReturnType<typeof useSceneContextLogic> | undefined
>(undefined);

export type SceneProviderProps = {
  children: ReactNode;
  animation: Animation;
  scene: Scene;
  collabSession: CollabSession | null;
};

export const SceneProvider = ({
  children,
  animation,
  scene,
  collabSession,
}: SceneProviderProps) => {
  const value = useSceneContextLogic(animation, scene, collabSession);

  return (
    <SceneContext.Provider {...{ value }}>{children}</SceneContext.Provider>
  );
};
