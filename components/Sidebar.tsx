'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Lock, Home } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar - macOS Style */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 min-h-screen fixed left-0 top-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <Lock className="w-5 h-5 text-white dark:text-black" />
            </div>
            <span className="font-bold text-xl text-black dark:text-white">Cryptify</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black dark:text-white bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium"
            >
              <Home className="w-5 h-5" />
              <span>Base64 Encoder</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-600 text-center font-medium">
            © 2026 Cryptify
          </p>
        </div>
      </div>

      {/* Mobile Header with Hamburger - macOS Style */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-40 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-white dark:text-black" />
            </div>
            <span className="font-bold text-lg text-black dark:text-white">Cryptify</span>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white dark:bg-black p-0 border-r border-gray-200 dark:border-gray-800">
              <div className="flex flex-col h-full">
                {/* Logo in Mobile Menu */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white dark:text-black" />
                    </div>
                    <span className="font-bold text-xl text-black dark:text-white">Cryptify</span>
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black dark:text-white bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium"
                    >
                      <Home className="w-5 h-5" />
                      <span>Base64 Encoder</span>
                    </Link>
                  </div>
                </nav>

                {/* Mobile Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-600 text-center font-medium">
                    © 2026 Cryptify
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
