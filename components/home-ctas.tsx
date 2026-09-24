"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

import type { ArrowRightIconHandle } from "@/components/animated-icons/arrow-right";
import type { ComponentIconHandle } from "@/components/animated-icons/component";

import { ArrowRightIcon } from "@/components/animated-icons/arrow-right";
import { ComponentIcon } from "@/components/animated-icons/component";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useFeedback } from "@/hooks/use-feedback";
import { NAV_FORWARD } from "@/lib/nav-transition";
import { cn } from "@/lib/utils";

const GetStartedButton = () => {
  const arrowRightRef = useRef<ArrowRightIconHandle>(null);
  const playClick = useFeedback({ sound: "click" });

  const handleMouseEnter = useCallback(() => {
    arrowRightRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    arrowRightRef.current?.stopAnimation();
  }, []);

  return (
    <Link
      href={ROUTES.DOCS_INSTALLATION}
      className={cn(buttonVariants(), "px-4")}
      onClick={playClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      prefetch
      transitionTypes={NAV_FORWARD}
    >
      Get Started
      <ArrowRightIcon className="hidden sm:inline" ref={arrowRightRef} />
    </Link>
  );
};

const BrowseComponentsButton = () => {
  const componentIconRef = useRef<ComponentIconHandle>(null);
  const playClick = useFeedback({ sound: "click" });

  const handleMouseEnter = useCallback(() => {
    componentIconRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    componentIconRef.current?.stopAnimation();
  }, []);

  return (
    <Link
      href={ROUTES.DOCS_COMPONENTS}
      className={cn(buttonVariants({ variant: "outline" }), "px-4")}
      onClick={playClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      prefetch
      transitionTypes={NAV_FORWARD}
    >
      <ComponentIcon
        className="hidden sm:inline"
        ref={componentIconRef}
        size={22}
      />
      Browse Components
    </Link>
  );
};

export const HomeCtas = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-wrap items-center justify-center gap-4",
      className
    )}
  >
    <GetStartedButton />
    <BrowseComponentsButton />
  </div>
);
