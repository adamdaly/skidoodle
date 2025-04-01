import { memo } from "react";
import { SignOut } from "./components/sign-out";

export const Header = memo(() => {
  return (
    <header className="border-b">
      <div className="flex flex-row items-center justify-between mx-auto max-w-6xl px-4 py-4">
        <div className="font-heading text-4xl md:text-6xl">Skidoodle</div>
        <div className="ml-4">
          <SignOut />
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
