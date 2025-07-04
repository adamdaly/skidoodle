import { useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import { user } from "./user";

export const useUser = () => {
  const loadableAtom = loadable(user);
  return useAtomValue(loadableAtom);
};
