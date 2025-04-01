import { atomWithDefault } from "jotai/utils";
import { Animation } from "@/custom/types";
import { getAnimations } from "@/api/animation-api";

export const Animations = atomWithDefault<Promise<Animation[]>>(async () => {
  const response = await getAnimations({
    withCredentials: true,
  });
  return response.data;
});
