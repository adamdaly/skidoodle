"use client";
import { memo } from "react";
import { signIn } from "next-auth/react";

export const SignInCta = memo(() => {
  return (
    <button
      data-testid="cta-sign-in"
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
});

SignInCta.displayName = "SignInCta";
