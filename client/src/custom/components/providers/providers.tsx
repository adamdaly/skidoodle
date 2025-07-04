"use client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/custom/services/apollo";
import { Provider as JotaiProvider } from "jotai";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <JotaiProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </JotaiProvider>
  );
};
