'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const algorithms = [
  // Two Way
  { name: 'Base64', path: '/base64', category: 'Two Way', description: 'Binary-to-text encoding using 64 characters' },
  { name: 'Hex', path: '/hex', category: 'Two Way', description: 'Convert text to/from hexadecimal with various delimiters' },
  { name: 'URL', path: '/url', category: 'Two Way', description: 'Percent-encode/decode for safe URL usage (RFC 3986)' },
  { name: 'Base32', path: '/base32', category: 'Two Way', description: 'RFC 4648 Base32 encoding and decoding' },
  { name: 'ROT13', path: '/rot13', category: 'Two Way', description: 'Simple cipher rotating letters by 13 positions' },
  { name: 'Cryptify', path: '/cryptify', category: 'Two Way', description: 'Custom position-based XOR cipher' },
  // Advanced
  { name: 'Chain Encrypt', path: '/chain-encrypt', category: 'Advanced', description: 'Multi-layer encryption with configurable encoder chains' },
  // One Way
  { name: 'MD5', path: '/md5', category: 'One Way', description: 'MD5 cryptographic hash function (128-bit)' },
  { name: 'SHA1', path: '/sha1', category: 'One Way', description: 'SHA-1 cryptographic hash function (160-bit)' },
];

export default function HomePage() {
  const twoWay = algorithms.filter(a => a.category === 'Two Way');
  const advanced = algorithms.filter(a => a.category === 'Advanced');
  const oneWay = algorithms.filter(a => a.category === 'One Way');

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-black to-gray-900 dark:from-gray-950 dark:to-black text-white p-6 md:p-12">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              All-in-one Encryption & Encoding
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-2">
              Fast, secure, and locally-processed algorithms
            </p>
            <p className="text-sm md:text-base text-gray-400">
              Encode, decode, hash, and encrypt text instantly - all processing happens in your browser
            </p>
          </div>
        </div>

      {/* Algorithms Grid */}
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Two Way */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Two-Way Algorithms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {twoWay.map((algo) => (
              <Link key={algo.path} href={algo.path}>
                <Card className="border border-gray-200 dark:border-gray-800 p-6 hover:border-black dark:hover:border-white transition-all cursor-pointer h-full group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {algo.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {algo.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Advanced */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Advanced Encryption</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advanced.map((algo) => (
              <Link key={algo.path} href={algo.path}>
                <Card className="border border-gray-200 dark:border-gray-800 p-6 hover:border-black dark:hover:border-white transition-all cursor-pointer h-full group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {algo.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {algo.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* One Way */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6">One-Way Hashing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {oneWay.map((algo) => (
              <Link key={algo.path} href={algo.path}>
                <Card className="border border-gray-200 dark:border-gray-800 p-6 hover:border-black dark:hover:border-white transition-all cursor-pointer h-full group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {algo.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {algo.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-6 md:p-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2026 Cryptify • All processing done locally in your browser
          </p>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}
