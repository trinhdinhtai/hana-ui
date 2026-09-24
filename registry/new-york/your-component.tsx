import type { HTMLAttributes } from "react";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type YourComponentProps = HTMLAttributes<HTMLDivElement>;

/**
 * 🚀 YOUR COMPONENT TEMPLATE
 *
 * This is a placeholder component. Replace this with your actual component implementation.
 *
 * Steps to customize:
 * 1. Rename this file to match your component name (e.g., my-button.tsx)
 * 2. Update the component logic and props
 * 3. Update registry.json with your component details
 * 4. Run `pnpm registry:build` to rebuild the registry
 *
 * For more information, visit the documentation.
 */
const YourComponent = forwardRef<HTMLDivElement, YourComponentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-48 flex-col items-center justify-center space-y-2 rounded-md border border-muted bg-muted/20 p-4 text-center",
        className
      )}
      {...props}
    >
      <p className="text-sm text-muted-foreground/70">
        Replace this placeholder with your custom shadcn component
      </p>
      <p className="text-center text-xs text-muted-foreground">
        Edit{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          registry/new-york/your-component.tsx
        </code>{" "}
        to get started
      </p>
    </div>
  )
);

YourComponent.displayName = "YourComponent";

export { YourComponent };
