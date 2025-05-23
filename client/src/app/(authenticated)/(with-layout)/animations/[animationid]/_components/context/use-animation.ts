import { useContext } from "react";
import { AnimationContext } from "./animation.context";

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider.");
  }
  return context;
};
