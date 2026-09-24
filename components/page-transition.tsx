"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

const directional = {
  default: "nav-forward",
  "nav-back": "nav-back",
  "nav-forward": "nav-forward",
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={pathname}
      name="app-page"
      share={directional}
      enter={directional}
      exit={directional}
      default="none"
    >
      {children}
    </ViewTransition>
  );
};
