import { useContext } from "react";
import { AnimationContext } from "./animation.context";

export const useAnimation = () => useContext(AnimationContext)!;
