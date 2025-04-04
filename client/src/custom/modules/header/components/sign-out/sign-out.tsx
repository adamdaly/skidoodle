import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

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
