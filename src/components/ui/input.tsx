/**
 * Input Component
 * 
 * A styled input component with consistent design system integration.
 * Supports all standard HTML input attributes and proper accessibility.
 * 
 * @example
 * <Input type="email" placeholder="Enter your email" />
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 py-2",
          // Typography
          "text-sm text-text-primary placeholder:text-text-tertiary",
          // Focus states
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // File input specific
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }