import { useContext } from "react";
import { InviteContext } from "./invite.context";

export const useInvite = () => useContext(InviteContext)!;
