import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider select-none">
            {label}
          </label>
        )}
        <div className="relative w-full inline-flex items-center">
          {icon && (
            <div className="absolute left-4 text-textMuted pointer-events-none transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full bg-[#101016] text-foreground text-sm rounded-xl border border-border px-4 py-3.5 outline-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] placeholder:text-textMuted focus:border-primary/80 focus:shadow-[0_0_20px_0_rgba(99,91,255,0.25)]",
              {
                "pl-11": !!icon,
                "border-accent-danger/50 focus:border-accent-danger focus:shadow-[0_0_20px_0_rgba(255,77,109,0.25)]":
                  !!error,
              },
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-accent-danger font-medium select-none animate-pulse">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-xs text-textMuted select-none">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
