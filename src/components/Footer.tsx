/**
 * Footer Component
 * 
 * The main footer with company information, links, and privacy notices.
 * Features responsive design and proper semantic structure.
 */

import React from 'react';
import Link from 'next/link';
import { Shield, MessageSquare, Heart } from 'lucide-react';

/**
 * Main footer component
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-800 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">
                  Anonymous Feedback System
                </span>
              </div>
              
              <p className="text-secondary-300 leading-relaxed">
                Making schools better through honest communication. 
                Your privacy is our priority, and every voice matters 
                in building a better educational environment.
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-secondary-400">
                <Shield className="h-4 w-4" />
                <span>100% Anonymous & Secure</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <nav className="space-y-2">
                <Link 
                  href="/"
                  className="block text-secondary-300 hover:text-white transition-colors duration-fast"
                >
                  Submit Feedback
                </Link>
                <Link 
                  href="/admin/login"
                  className="block text-secondary-300 hover:text-white transition-colors duration-fast"
                >
                  Admin Login
                </Link>
                <Link 
                  href="/privacy"
                  className="block text-secondary-300 hover:text-white transition-colors duration-fast"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms"
                  className="block text-secondary-300 hover:text-white transition-colors duration-fast"
                >
                  Terms of Service
                </Link>
              </nav>
            </div>

            {/* Contact & Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <div className="space-y-3 text-secondary-300">
                <div>
                  <p className="font-medium text-white">Need Help?</p>
                  <p className="text-sm">
                    Contact your school administration for technical support 
                    or questions about the feedback system.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium text-white">Response Time</p>
                  <p className="text-sm">
                    Feedback is typically reviewed within 24 hours during 
                    business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-secondary-400 text-sm">
              <p>
                © {currentYear} School Feedback System. All rights reserved.
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="text-center md:text-right">
              <p className="text-sm text-secondary-400 mb-1">
                Your privacy is our priority. All submissions are 100% anonymous.
              </p>
              <div className="flex items-center justify-center md:justify-end space-x-1 text-xs text-secondary-500">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-400" />
                <span>for better education</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;