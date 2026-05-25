import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "borderless";
  hoverEffect?: "none" | "lift" | "glow-purple" | "glow-cyan" | "glow-green";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      variant = "default",
      hoverEffect = "none",
      padding = "md",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          {
            // Variant Classes
            "glass bg-secondary/40 border border-border/80": variant === "default",
            "glass-elevated": variant === "elevated",
            "bg-transparent border-0": variant === "borderless",
            // Padding Classes
            "p-0": padding === "none",
            "p-4": padding === "sm",
            "p-6": padding === "md",
            "p-8": padding === "lg",
            // Hover Effects
            "hover:-translate-y-1 hover:border-border-hover": hoverEffect === "lift",
            "hover:-translate-y-1 hover:border-primary/30 glow-purple hover:glow-purple":
              hoverEffect === "glow-purple",
            "hover:-translate-y-1 hover:border-accent-cyan/30 glow-cyan hover:glow-cyan":
              hoverEffect === "glow-cyan",
            "hover:-translate-y-1 hover:border-accent-green/30 glow-green hover:glow-green":
              hoverEffect === "glow-green",
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
