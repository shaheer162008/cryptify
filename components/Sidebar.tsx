'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Lock } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Base64', href: '/', icon: '🔐' },
    { label: 'About', href: '/about', icon: 'ℹ️' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-blue-600 to-purple-700 dark:from-blue-900 dark:to-purple-900 text-white min-h-screen fixed left-0 top-0 shadow-xl">
        {/* Logo */}
        <div className="p-6 border-b border-white/20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-bold text-xl">Cryptify</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-colors group"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium group-hover:translate-x-1 transition-transform">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Premium Button */}
        <div className="p-6 border-t border-white/20">
          <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
            ⭐ Premium
          </Button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 text-center text-xs text-white/70">
          <p>© 2026 Cryptify</p>
        </div>
      </div>

      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-900 dark:to-purple-900 text-white z-40 shadow-lg">
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-bold text-lg">Cryptify</span>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-gradient-to-b from-blue-600 to-purple-700 dark:from-blue-900 dark:to-purple-900 text-white p-0">
              <div className="flex flex-col h-full">
                {/* Logo in Mobile Menu */}
                <div className="p-6 border-b border-white/20">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="font-bold text-xl">Cryptify</span>
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 p-6">
                  <div className="space-y-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-colors"
                      >
                        <span className="text-xl">{link.icon}</span>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile Premium Button */}
                <div className="p-6 border-t border-white/20">
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                    ⭐ Premium
                  </Button>
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
