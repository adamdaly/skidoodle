import { memo } from "react";
import Link from "next/link";
import { SignOut } from "./components/sign-out";

export const Header = memo(() => {
  return (
    <header>
      <div className="flex flex-row items-center justify-between">
        <Link href="/" className="font-heading text-4xl md:text-6xl">
          Skidoodle
        </Link>
        <div className="ml-4">
          <SignOut />
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
