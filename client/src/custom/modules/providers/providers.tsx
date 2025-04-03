"use client";
// import { Provider as JotaiProvider } from "jotai";
// import { store } from "@/custom/state/store";
import { ReactNode } from "react";

export type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return <>{children}</>;
  // return <JotaiProvider store={store}>{children}</JotaiProvider>;
};
