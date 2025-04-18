"use client";
import { createContext, ReactNode } from "react";
import { Animation as AnimationType } from "@/custom/types";
import { useAnimationContextLogic } from "./use-animation-context.logic";

export const AnimationContext = createContext<
  ReturnType<typeof useAnimationContextLogic> | undefined
>(undefined);

export type AnimationProviderProps = {
  children: ReactNode;
  animation: AnimationType;
};

export const AnimationProvider = ({
  children,
  animation,
}: AnimationProviderProps) => {
  const value = useAnimationContextLogic(animation);

  return (
    <AnimationContext.Provider {...{ value }}>
      {children}
    </AnimationContext.Provider>
  );
};
