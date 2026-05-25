import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-xl select-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
          {
            // Variant Styles
            "bg-gradient-to-r from-primary to-[#8b5cf6] text-white shadow-[0_0_20px_0_rgba(99,91,255,0.25)] hover:shadow-[0_0_28px_0_rgba(99,91,255,0.45)] hover:from-primary-hover hover:to-[#9f7aea]":
              variant === "primary",
            "bg-secondary border border-border text-foreground hover:bg-secondary-hover hover:border-border-hover":
              variant === "secondary",
            "bg-transparent border border-primary text-primary shadow-[inset_0_0_12px_0_rgba(99,91,255,0.05)] hover:bg-primary-glow hover:shadow-[0_0_18px_0_rgba(99,91,255,0.25)]":
              variant === "outline",
            "bg-transparent text-textSecondary hover:bg-secondary-hover hover:text-foreground":
              variant === "ghost",
            "bg-accent-danger/10 border border-accent-danger/30 text-accent-danger hover:bg-accent-danger/25 hover:shadow-[0_0_18px_0_rgba(255,77,109,0.25)]":
              variant === "danger",
            "bg-accent-green/10 border border-accent-green/30 text-accent-green hover:bg-accent-green/25 hover:shadow-[0_0_18px_0_rgba(0,229,117,0.25)]":
              variant === "success",
            // Sizes
            "px-4 py-2 text-xs": size === "sm",
            "px-6 py-3 text-sm": size === "md",
            "px-8 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span className="inline-flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
