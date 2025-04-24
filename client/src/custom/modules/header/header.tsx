import { memo, ReactNode } from "react";
import Link from "next/link";
import { SignOut } from "./components/sign-out";

export type HeaderProps = {
  children?: ReactNode;
};

export const Header = memo(({ children }: HeaderProps) => {
  return (
    <header>
      <div className="flex flex-row items-center justify-between">
        <Link href="/" className="font-heading text-4xl md:text-6xl">
          Skidoodle
        </Link>
        {children && <div className="ml-6 mr-auto">{children}</div>}
        <div className="ml-4">
          <SignOut />
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
