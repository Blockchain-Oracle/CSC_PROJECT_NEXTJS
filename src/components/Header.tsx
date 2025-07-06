/**
 * Header Component
 * 
 * The main navigation header with responsive design, authentication state,
 * and proper accessibility features.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Main header component
 */
const Header: React.FC = () => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock auth state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Handle logout action
   */
  const handleLogout = () => {
    // Mock logout functionality
    setIsAuthenticated(false);
    setIsMobileMenuOpen(false);
    // In a real app, you would clear auth tokens, redirect, etc.
  };

  /**
   * Close mobile menu when navigating
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * Navigation items based on authentication state
   */
  const getNavigationItems = () => {
    if (isAuthenticated) {
      return [
        {
          href: '/admin/dashboard',
          label: 'Dashboard',
          icon: Shield,
          show: pathname !== '/admin/dashboard',
        },
      ];
    } else {
      return [
        {
          href: '/admin/login',
          label: 'Admin Login',
          icon: Shield,
          show: pathname !== '/admin/login',
        },
      ];
    }
  };

  const navigationItems = getNavigationItems().filter(item => item.show);

  return (
    <header className="bg-primary-600 text-white shadow-lg sticky top-0 z-fixed">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-fast"
            onClick={closeMobileMenu}
          >
            <div className="bg-white/10 p-2 rounded-lg">
              <MessageSquare className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold hidden sm:block">
              Anonymous Feedback System
            </span>
            <span className="text-lg font-bold sm:hidden">
              Feedback
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg',
                    'transition-colors duration-fast',
                    'hover:bg-white/10 focus:bg-white/10',
                    'focus:outline-none focus:ring-2 focus:ring-white/20'
                  )}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className={cn(
                  'text-white hover:bg-white/10 hover:text-white',
                  'focus:bg-white/10 focus:text-white'
                )}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg',
                      'transition-colors duration-fast',
                      'hover:bg-white/10 focus:bg-white/10',
                      'focus:outline-none focus:ring-2 focus:ring-white/20'
                    )}
                    onClick={closeMobileMenu}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={cn(
                    'w-full justify-start text-white hover:bg-white/10 hover:text-white',
                    'focus:bg-white/10 focus:text-white px-4 py-3'
                  )}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;