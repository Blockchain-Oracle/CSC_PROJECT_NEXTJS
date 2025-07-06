/**
 * Section Component
 * 
 * A flexible section component for organizing page content with
 * consistent spacing, backgrounds, and layout patterns.
 * 
 * @example
 * <Section variant="card" spacing="large">
 *   <Section.Header>
 *     <h2>Section Title</h2>
 *   </Section.Header>
 *   <Section.Content>
 *     Section content
 *   </Section.Content>
 * </Section>
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Visual variant of the section */
  variant?: 'default' | 'card' | 'elevated' | 'bordered' | 'gradient';
  /** Spacing size */
  spacing?: 'none' | 'small' | 'medium' | 'large';
  /** Whether to center content */
  centered?: boolean;
  /** Maximum width constraint */
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

interface SectionSubComponentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main section component
 */
const Section: React.FC<SectionProps> & {
  Header: React.FC<SectionSubComponentProps>;
  Content: React.FC<SectionSubComponentProps>;
  Footer: React.FC<SectionSubComponentProps>;
} = ({ 
  children, 
  className,
  variant = 'default',
  spacing = 'medium',
  centered = false,
  maxWidth = 'none'
}) => {
  const variantClasses = {
    default: '',
    card: 'bg-background-secondary rounded-lg shadow-md',
    elevated: 'bg-background-secondary rounded-lg shadow-lg',
    bordered: 'bg-background-secondary border border-primary rounded-lg',
    gradient: 'bg-gradient-card rounded-lg shadow-md',
  };

  const spacingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  const maxWidthClasses = {
    none: '',
    sm: 'max-w-sm mx-auto',
    md: 'max-w-md mx-auto',
    lg: 'max-w-lg mx-auto',
    xl: 'max-w-xl mx-auto',
    '2xl': 'max-w-2xl mx-auto',
  };

  return (
    <section 
      className={cn(
        // Base styles
        'w-full',
        // Variant styles
        variantClasses[variant],
        // Spacing
        spacingClasses[spacing],
        // Centering
        centered && 'text-center',
        // Max width
        maxWidthClasses[maxWidth],
        // Custom classes
        className
      )}
    >
      {children}
    </section>
  );
};

/**
 * Section header
 */
const SectionHeader: React.FC<SectionSubComponentProps> = ({ 
  children, 
  className 
}) => (
  <header 
    className={cn(
      'mb-6',
      className
    )}
  >
    {children}
  </header>
);

/**
 * Section content
 */
const SectionContent: React.FC<SectionSubComponentProps> = ({ 
  children, 
  className 
}) => (
  <div 
    className={cn(
      'space-y-4',
      className
    )}
  >
    {children}
  </div>
);

/**
 * Section footer
 */
const SectionFooter: React.FC<SectionSubComponentProps> = ({ 
  children, 
  className 
}) => (
  <footer 
    className={cn(
      'mt-6',
      className
    )}
  >
    {children}
  </footer>
);

// Attach sub-components
Section.Header = SectionHeader;
Section.Content = SectionContent;
Section.Footer = SectionFooter;

export default Section;