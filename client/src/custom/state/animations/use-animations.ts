import { useAtomValue } from "jotai";
import { Animations } from "./animations";

export const useGetAnimations = () => {
  return useAtomValue(Animations);
};
