"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { useFeedback } from "@/hooks/use-feedback";
import { navTransitionTypes } from "@/lib/nav-transition";
import { cn } from "@/lib/utils";

export const MainNav = ({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string }[];
}) => {
  const pathname = usePathname();
  const playClick = useFeedback({ sound: "click" });

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          prefetch
          onClick={() => {
            playClick();
          }}
          className={cn(
            buttonVariants({ size: "sm", variant: "ghost" }),
            pathname === item.href && "text-primary"
          )}
          transitionTypes={navTransitionTypes(item.href, pathname)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
