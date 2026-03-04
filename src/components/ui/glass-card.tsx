import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  strong?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, strong, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : "glass",
        glow && "glass-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
