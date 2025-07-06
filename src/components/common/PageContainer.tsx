/**
 * PageContainer Component
 * 
 * A reusable container component that provides consistent layout,
 * spacing, and responsive behavior across all pages. It includes
 * proper semantic structure and accessibility features.
 * 
 * @example
 * <PageContainer>
 *   <PageContainer.Header>
 *     <h1>Page Title</h1>
 *   </PageContainer.Header>
 *   <PageContainer.Content>
 *     Page content goes here
 *   </PageContainer.Content>
 * </PageContainer>
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Whether to apply maximum width constraint */
  constrained?: boolean;
  /** Background variant */
  variant?: 'default' | 'gradient' | 'accent';
}

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Main page container component
 */
const PageContainer: React.FC<PageContainerProps> & {
  Header: React.FC<PageSectionProps>;
  Content: React.FC<PageSectionProps>;
  Footer: React.FC<PageSectionProps>;
} = ({ 
  children, 
  className, 
  constrained = true,
  variant = 'default'
}) => {
  const backgroundClasses = {
    default: 'bg-background-primary',
    gradient: 'bg-gradient-primary',
    accent: 'bg-background-accent',
  };

  return (
    <div 
      className={cn(
        // Base styles
        'min-h-screen w-full',
        // Background
        backgroundClasses[variant],
        // Custom classes
        className
      )}
    >
      <div 
        className={cn(
          // Container styles
          constrained ? 'container-custom' : 'w-full',
          // Vertical spacing
          'py-8 lg:py-12'
        )}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Page header section
 */
const PageHeader: React.FC<PageSectionProps> = ({ 
  children, 
  className, 
  as: Component = 'header' 
}) => (
  <Component 
    className={cn(
      // Spacing
      'mb-8 lg:mb-12',
      // Text alignment
      'text-center',
      // Animation
      'animate-fade-in',
      className
    )}
  >
    {children}
  </Component>
);

/**
 * Page content section
 */
const PageContent: React.FC<PageSectionProps> = ({ 
  children, 
  className, 
  as: Component = 'main' 
}) => (
  <Component 
    className={cn(
      // Spacing
      'space-y-8 lg:space-y-12',
      // Animation
      'animate-slide-up',
      className
    )}
  >
    {children}
  </Component>
);

/**
 * Page footer section
 */
const PageFooter: React.FC<PageSectionProps> = ({ 
  children, 
  className, 
  as: Component = 'footer' 
}) => (
  <Component 
    className={cn(
      // Spacing
      'mt-12 lg:mt-16',
      // Animation
      'animate-fade-in',
      className
    )}
  >
    {children}
  </Component>
);

// Attach sub-components
PageContainer.Header = PageHeader;
PageContainer.Content = PageContent;
PageContainer.Footer = PageFooter;

export default PageContainer;