"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const CodeCollapsibleWrapper = ({
  className,
  children,
  navTriggerClassName,
  ...props
}: React.ComponentProps<typeof Collapsible> & {
  navTriggerClassName?: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Collapsible
      sounds
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative md:-mx-1", className)}
      {...props}
    >
      <div
        className={cn(
          "absolute top-1.5 right-9 z-10 flex items-center",
          navTriggerClassName
        )}
      >
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="h-7 rounded-md px-2 text-muted-foreground"
            />
          }
        >
          {isOpened ? "Collapse" : "Expand"}
        </CollapsibleTrigger>
        <Separator orientation="vertical" className="mx-1.5 h-4!" />
      </div>
      <CollapsibleContent
        keepMounted
        // Base UI sets `hidden` on a closed panel even with keepMounted;
        // keep it visible so the collapsed state shows a max-h-64 preview.
        hidden={false}
        className="relative mt-6 overflow-hidden data-closed:max-h-64 data-closed:[content-visibility:auto] [&>figure]:mt-0 [&>figure]:md:mx-0!"
      >
        {children}
      </CollapsibleContent>

      <div
        className={cn(
          "absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-linear-to-b from-code/70 to-code",
          isOpened && "hidden"
        )}
      >
        <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
          Expand
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
};
