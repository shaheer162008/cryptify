'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Cryptify
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Secure encryption & decryption at your fingertips.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/encrypt"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Encrypt
                </Link>
              </li>
              <li>
                <Link
                  href="/decrypt"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Decrypt
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Icons */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-600 hover:text-white transition-colors"
                asChild
              >
                <a href="https://github.com/shaheer162008" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-400 hover:text-white transition-colors"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-500 hover:text-white transition-colors"
                asChild
              >
                <a href="mailto:contact@cryptify.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-sm text-gray-600 dark:text-gray-400">
              <p>© {year} Cryptify. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
