import { useContext } from "react";
import { SceneContext } from "./scene.context";

export const useScene = () => useContext(SceneContext)!;
