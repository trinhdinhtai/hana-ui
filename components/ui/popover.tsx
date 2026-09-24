"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";

import { dropdownClose, dropdownOpen } from "@/audio/core";
import { useFeedback } from "@/hooks/use-feedback";
import { cn } from "@/lib/utils";

const Popover = ({
  sounds = false,
  onOpenChange,
  ...props
}: PopoverPrimitive.Root.Props & {
  sounds?: boolean;
}) => {
  const playOpen = useFeedback({ soundDef: dropdownOpen });
  const playClose = useFeedback({ soundDef: dropdownClose });
  const isControlled = props.open !== undefined;
  const lastOpen = useRef(props.open ?? props.defaultOpen ?? false);

  const playStateSound = useCallback(
    (open: boolean) => {
      if (!sounds || open === lastOpen.current) {
        return;
      }

      if (open) {
        playOpen();
      } else {
        playClose();
      }

      lastOpen.current = open;
    },
    [playClose, playOpen, sounds]
  );

  useEffect(() => {
    if (!isControlled) {
      return;
    }

    playStateSound(props.open ?? false);
  }, [isControlled, playStateSound, props.open]);

  const handleOpenChange = useCallback(
    (open: boolean, eventDetails: PopoverPrimitive.Root.ChangeEventDetails) => {
      playStateSound(open);
      onOpenChange?.(open, eventDetails);
    },
    [onOpenChange, playStateSound]
  );

  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      onOpenChange={handleOpenChange}
      {...props}
    />
  );
};

const PopoverPortal = ({ ...props }: PopoverPrimitive.Portal.Props) => (
  <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />
);

const PopoverTrigger = ({ ...props }: PopoverPrimitive.Trigger.Props) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);

const PopoverContent = ({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className="isolate z-50"
    >
      <PopoverPrimitive.Popup
        data-slot="popover-content"
        className={cn(
          "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
);

const PopoverHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="popover-header"
    className={cn("flex flex-col gap-0.5 text-sm", className)}
    {...props}
  />
);

const PopoverTitle = ({
  className,
  ...props
}: PopoverPrimitive.Title.Props) => (
  <PopoverPrimitive.Title
    data-slot="popover-title"
    className={cn("font-medium", className)}
    {...props}
  />
);

const PopoverDescription = ({
  className,
  ...props
}: PopoverPrimitive.Description.Props) => (
  <PopoverPrimitive.Description
    data-slot="popover-description"
    className={cn("text-muted-foreground", className)}
    {...props}
  />
);

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PopoverPortal,
};
