import { memo } from "react";

export const Footer = memo(() => (
  <footer className="w-full py-6 mt-auto bg-slate-50">
    <div className="text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Skidoodle. All rights reserved.
    </div>
  </footer>
));

Footer.displayName = "Footer";
