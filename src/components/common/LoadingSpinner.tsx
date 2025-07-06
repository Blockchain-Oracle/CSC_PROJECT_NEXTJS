/**
 * LoadingSpinner Component
 * 
 * A reusable loading spinner component with multiple size variants
 * and accessibility features.
 * 
 * @example
 * <LoadingSpinner size="md" />
 * <LoadingSpinner size="lg" text="Loading..." />
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional loading text */
  text?: string;
  /** Additional CSS classes */
  className?: string;
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'accent';
}

/**
 * Loading spinner component with accessibility support
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className,
  variant = 'primary',
}) => {
  // Size-specific classes
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  // Color variant classes
  const variantClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    accent: 'text-accent-600',
  };

  return (
    <div 
      className={cn(
        'flex items-center justify-center gap-3',
        className
      )}
      role="status"
      aria-label={text || 'Loading'}
    >
      <svg
        className={cn(
          'animate-spin',
          sizeClasses[size],
          variantClasses[variant]
        )}
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
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      
      {text && (
        <span 
          className={cn(
            'text-sm font-medium',
            variantClasses[variant]
          )}
        >
          {text}
        </span>
      )}
      
      {/* Screen reader only text */}
      <span className="sr-only">
        {text || 'Loading, please wait...'}
      </span>
    </div>
  );
};

export default LoadingSpinner;