"use client";
import { createContext, ReactNode } from "react";

import { useInviteContextLogic } from "./use-invite-context.logic";

export const InviteContext = createContext<
  ReturnType<typeof useInviteContextLogic> | undefined
>(undefined);

export type InviteProviderProps = {
  children: ReactNode;
  inviteid: string;
};

export const InviteProvider = ({ children, inviteid }: InviteProviderProps) => {
  const value = useInviteContextLogic(inviteid);

  return (
    <InviteContext.Provider {...{ value }}>{children}</InviteContext.Provider>
  );
};
