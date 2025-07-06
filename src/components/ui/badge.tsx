/**
 * Badge Component
 * 
 * A small status indicator component with multiple variants.
 * Perfect for displaying tags, status indicators, and labels.
 * 
 * @example
 * <Badge variant="default">New</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="destructive">Error</Badge>
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base styles
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-white hover:bg-primary-700",
        secondary:
          "border-transparent bg-secondary-100 text-secondary-900 hover:bg-secondary-200",
        destructive:
          "border-transparent bg-error-600 text-white hover:bg-error-700",
        outline: 
          "text-text-primary border-border-primary",
        success:
          "border-transparent bg-success-600 text-white hover:bg-success-700",
        warning:
          "border-transparent bg-warning-600 text-white hover:bg-warning-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }