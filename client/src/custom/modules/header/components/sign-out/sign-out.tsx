import { memo } from "react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const SignOut = memo(() => {
  return (
    <Button asChild>
      <Link href="/signed-out" className="flex items-center gap-2">
        <LogOut className="h-4 w-4" />
        <span>Sign out</span>
      </Link>
    </Button>
  );
});

SignOut.displayName = "SignOut";
