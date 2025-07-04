import { atom } from "jotai";
import { authServiceClient } from "@/custom/services/auth/client";

export const user = atom(async () => {
  return await authServiceClient.getCurrentUser();
});
