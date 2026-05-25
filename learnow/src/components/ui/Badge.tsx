import React from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "cyan" | "green" | "danger" | "warning" | "muted";
  outline?: boolean;
}

export default function Badge({
  className,
  children,
  variant = "primary",
  outline = false,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full select-none transition-all duration-300 border",
        {
          // Primary (Purple)
          "bg-primary/10 border-primary/20 text-primary":
            variant === "primary" && !outline,
          "bg-transparent border-primary text-primary shadow-[0_0_12px_rgba(99,91,255,0.15)]":
            variant === "primary" && outline,

          // Cyan
          "bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan":
            variant === "cyan" && !outline,
          "bg-transparent border-accent-cyan text-accent-cyan shadow-[0_0_12px_rgba(0,216,246,0.15)]":
            variant === "cyan" && outline,

          // Green
          "bg-accent-green/10 border-accent-green/20 text-accent-green":
            variant === "green" && !outline,
          "bg-transparent border-accent-green text-accent-green shadow-[0_0_12px_rgba(0,229,117,0.15)]":
            variant === "green" && outline,

          // Danger
          "bg-accent-danger/10 border-accent-danger/20 text-accent-danger":
            variant === "danger" && !outline,
          "bg-transparent border-accent-danger text-accent-danger shadow-[0_0_12px_rgba(255,77,109,0.15)]":
            variant === "danger" && outline,

          // Warning
          "bg-accent-warning/10 border-accent-warning/20 text-accent-warning":
            variant === "warning" && !outline,
          "bg-transparent border-accent-warning text-accent-warning shadow-[0_0_12px_rgba(255,179,71,0.15)]":
            variant === "warning" && outline,

          // Muted
          "bg-border/30 border-border text-textSecondary":
            variant === "muted" && !outline,
          "bg-transparent border-border text-textSecondary":
            variant === "muted" && outline,
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
