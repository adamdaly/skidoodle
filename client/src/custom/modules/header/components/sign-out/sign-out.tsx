"use client";
import { memo } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { authServiceClient } from "@/custom/services/auth/client";

export const SignOut = memo(() => {
  const router = useRouter();

  const onClick = async () => {
    try {
      await authServiceClient.signOut();
      router.push("/signed-out");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button data-testid="cta-sign-out" onClick={onClick}>
      <LogOut className="h-4 w-4" />
      <span>Sign out</span>
    </Button>
  );
});

SignOut.displayName = "SignOut";
