import React from "react";
import { cn } from "@/lib/cn";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // Percentage from 0 to 100
  max?: number;
  height?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "cyan";
  showLabel?: boolean;
}

export default function ProgressBar({
  className,
  value = 0,
  max = 100,
  height = "md",
  variant = "success",
  showLabel = false,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center justify-between">
        {showLabel && (
          <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
            Progression
          </span>
        )}
        {showLabel && (
          <span className="text-xs font-bold text-foreground">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div
        className={cn(
          "w-full bg-[#101016] border border-border/80 rounded-full overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]",
          {
            "h-1.5": height === "sm",
            "h-3": height === "md",
            "h-5": height === "lg",
          }
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative overflow-hidden",
            {
              "bg-gradient-to-r from-primary to-[#8b5cf6] shadow-[0_0_12px_rgba(99,91,255,0.4)]":
                variant === "primary",
              "bg-gradient-to-r from-[#00b460] to-accent-green shadow-[0_0_12px_rgba(0,229,117,0.4)]":
                variant === "success",
              "bg-gradient-to-r from-[#00b3e6] to-accent-cyan shadow-[0_0_12px_rgba(0,216,246,0.4)]":
                variant === "cyan",
            }
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 shimmer-bg animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
