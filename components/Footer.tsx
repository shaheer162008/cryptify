'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="font-bold text-black dark:text-white mb-3">Cryptify</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All-in-one encryption & encoding platform with locally-processed algorithms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-black dark:text-white mb-3 text-sm">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Algorithms
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-black dark:text-white mb-3 text-sm">Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about/cryptify" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Cryptify Cipher
                </Link>
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-400">Privacy: Local processing only</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-xs text-gray-600 dark:text-gray-400">
          <p>© 2026 Cryptify • All processing done locally in your browser</p>
        </div>
      </div>
    </footer>
  );
}
