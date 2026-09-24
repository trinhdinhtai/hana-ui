"use client";

import { cn } from "cn";
import Link from "next/link";
import { useCallback, useRef } from "react";

import type { ArrowLeftIconHandle } from "@/components/animated-icons/arrow-left";
import type { ArrowRightIconHandle } from "@/components/animated-icons/arrow-right";

import { ArrowLeftIcon } from "@/components/animated-icons/arrow-left";
import { ArrowRightIcon } from "@/components/animated-icons/arrow-right";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const DocsNavLink = ({
  href,
  children,
  className,
  tooltip,
  transitionTypes,
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  tooltip?: { title: string; icon: React.ReactNode };
  transitionTypes?: string[];
}) => {
  const iconRef = useRef<ArrowLeftIconHandle | ArrowRightIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    iconRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    iconRef.current?.stopAnimation();
  }, []);

  const link = (
    <Button
      variant="secondary"
      size={size}
      className={cn("shadow-none", className)}
      nativeButton={false}
      render={
        <Link href={href} transitionTypes={transitionTypes}>
          {transitionTypes?.includes("nav-back") && (
            <ArrowLeftIcon ref={iconRef} />
          )}
          {children}
          {transitionTypes?.includes("nav-forward") && (
            <ArrowRightIcon ref={iconRef} />
          )}
        </Link>
      }
      sound="click"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger render={link} />
        <TooltipContent className="pr-2 pl-3">
          <div className="flex items-center gap-3">
            {tooltip.title}
            {tooltip.icon && <Kbd>{tooltip.icon}</Kbd>}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};
