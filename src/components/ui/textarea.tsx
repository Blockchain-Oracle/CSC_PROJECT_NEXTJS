/**
 * Textarea Component
 * 
 * A styled textarea component with consistent design system integration.
 * Supports all standard HTML textarea attributes and proper accessibility.
 * 
 * @example
 * <Textarea placeholder="Enter your message" rows={4} />
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex min-h-[80px] w-full rounded-md border border-border-primary bg-background-secondary px-3 py-2",
          // Typography
          "text-sm text-text-primary placeholder:text-text-tertiary",
          // Focus states
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Resize behavior
          "resize-vertical",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }