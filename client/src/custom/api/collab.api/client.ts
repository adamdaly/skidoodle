import { CollabSession } from "@/custom/types";
import { clientInstance } from "../client-api";

export type InviteBody = {
  sceneid: number;
  email: string;
};

export const invite = (body: InviteBody) =>
  clientInstance.post("/collab", body);

export type ConfirmPinBody = {
  inviteid: string;
  pin: string;
};

export const confirmPin = (body: ConfirmPinBody) =>
  clientInstance.post<CollabSession>("/collab/confirm", body);
