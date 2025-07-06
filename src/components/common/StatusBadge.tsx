/**
 * StatusBadge Component
 * 
 * A reusable badge component for displaying status information
 * with consistent styling and semantic meaning.
 * 
 * @example
 * <StatusBadge status="success" size="md">
 *   Completed
 * </StatusBadge>
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle, XCircle, Info } from 'lucide-react';

interface StatusBadgeProps {
  /** Status type that determines color and icon */
  status: 'pending' | 'resolved' | 'success' | 'warning' | 'error' | 'info';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show an icon */
  showIcon?: boolean;
  /** Custom icon to override default */
  icon?: React.ReactNode;
  /** Badge content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Status badge component with semantic colors and icons
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  icon,
  children,
  className,
}) => {
  // Status-specific styling
  const statusClasses = {
    pending: 'bg-warning-50 text-warning-700 border-warning-200',
    resolved: 'bg-success-50 text-success-700 border-success-200',
    success: 'bg-success-50 text-success-700 border-success-200',
    warning: 'bg-warning-50 text-warning-700 border-warning-200',
    error: 'bg-error-50 text-error-700 border-error-200',
    info: 'bg-info-50 text-info-700 border-info-200',
  };

  // Size-specific styling
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  // Icon size mapping
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  // Default icons for each status
  const defaultIcons = {
    pending: Clock,
    resolved: CheckCircle,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
    info: Info,
  };

  const IconComponent = defaultIcons[status];

  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center gap-1.5',
        'font-medium rounded-full border',
        'transition-colors duration-fast',
        // Status styles
        statusClasses[status],
        // Size styles
        sizeClasses[size],
        // Custom classes
        className
      )}
    >
      {showIcon && (
        <>
          {icon || <IconComponent className={iconSizes[size]} />}
        </>
      )}
      {children}
    </span>
  );
};

export default StatusBadge;