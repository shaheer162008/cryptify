'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { ExternalLink, Zap, Lock, BookOpen } from 'lucide-react';

const algorithms = [
  {
    name: 'Base64',
    category: 'Two-Way Encoding',
    description: 'A binary-to-text encoding scheme that converts binary data into a radix-64 representation using 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). Each Base64 digit represents 6 bits of binary data.',
    useCases: ['Email transmission', 'Data URLs', 'API authentication', 'Storing binary data as text'],
    example: '"Hello" → "SGVsbG8="',
    wikipedia: 'https://en.wikipedia.org/wiki/Base64',
  },
  {
    name: 'Hexadecimal (Hex)',
    category: 'Two-Way Encoding',
    description: 'A base-16 numeral system using digits 0-9 and letters A-F. Hexadecimal is widely used in computing to represent binary data in a human-readable format, where each hex digit represents 4 bits.',
    useCases: ['Memory addresses', 'Color codes in web design', 'Machine code representation', 'Digital forensics'],
    example: '"Hello" → "48 65 6c 6c 6f"',
    wikipedia: 'https://en.wikipedia.org/wiki/Hexadecimal',
  },
  {
    name: 'URL Encoding',
    category: 'Two-Way Encoding',
    description: 'Percent-encoding (also called URL encoding) is a mechanism for encoding information in Uniform Resource Identifiers (URIs). It converts special characters into a format that can be safely transmitted over the internet, following RFC 3986 standards.',
    useCases: ['Query parameters in URLs', 'Web form submissions', 'API parameters', 'Safe special character transmission'],
    example: '"Hello World!" → "Hello%20World%21"',
    wikipedia: 'https://en.wikipedia.org/wiki/Percent-encoding',
  },
  {
    name: 'Base32',
    category: 'Two-Way Encoding',
    description: 'A base32 numeral system defined in RFC 4648 using 32 printable ASCII characters (A-Z, 2-7). Base32 is case-insensitive and uses only alphanumeric characters, making it suitable for systems with limited character sets.',
    useCases: ['Two-factor authentication (TOTP/HOTP)', 'Case-insensitive encoding', 'DNS DNSSEC encoding', 'Limited character set systems'],
    example: '"Hello" → "JBSWY3DPEBLW64TMMQ======"',
    wikipedia: 'https://en.wikipedia.org/wiki/Base32',
  },
  {
    name: 'ROT13',
    category: 'Two-Way Cipher',
    description: 'A simple letter substitution cipher that replaces each letter with the letter 13 positions after it in the alphabet. ROT13 is a special case of the Caesar cipher with a fixed shift of 13. Because it operates on 26 letters, applying ROT13 twice returns the original text (self-inverse).',
    useCases: ['Simple text obfuscation', 'Internet forums for spoiler text', 'Historical cipher education', 'Quick reversible transformation'],
    example: '"Hello World" → "Uryyb Jbeyq"',
    wikipedia: 'https://en.wikipedia.org/wiki/ROT13',
  },
  {
    name: 'Cryptify Cipher',
    category: 'Two-Way Cipher',
    description: 'A custom position-based XOR cipher created for the Cryptify platform. It uses the fixed seed key "CRYPTIFY" and applies XOR operations at each character position. It is fully reversible - applying it twice returns the original text. Note: This is for educational purposes only, not for security-critical applications.',
    useCases: ['Educational demonstration', 'Learning XOR-based ciphers', 'Non-security text obfuscation', 'Reversible text transformation'],
    example: '"Hello" → [encrypted bytes]',
    documentation: '/about/cryptify',
  },
  {
    name: 'MD5',
    category: 'One-Way Hashing',
    description: 'Message Digest Algorithm 5 (MD5) is a cryptographic hash function that produces a 128-bit hash value, typically expressed as a 32-character hexadecimal number. It is a one-way function, meaning you cannot reverse it to obtain the original input. MD5 is now considered cryptographically broken and should not be used for security purposes.',
    useCases: ['File integrity verification', 'Legacy system compatibility', 'Hash table data structures', 'Creating unique identifiers'],
    example: '"Hello" → "8b1a9953c4611296aaf7a3c4ab8f3879"',
    wikipedia: 'https://en.wikipedia.org/wiki/MD5',
  },
  {
    name: 'SHA-1',
    category: 'One-Way Hashing',
    description: 'Secure Hash Algorithm 1 (SHA-1) is a cryptographic hash function that produces a 160-bit hash value, typically expressed as a 40-character hexadecimal number. It is a one-way function widely used in legacy systems. SHA-1 is now considered cryptographically broken due to collision vulnerabilities and should not be used for new security applications.',
    useCases: ['Git commit identification', 'Legacy digital signatures', 'File integrity verification', 'Backwards compatibility'],
    example: '"Hello" → "f7ff9e8b7b1cce4932b34241f1f97a4aaa7d6c4c"',
    wikipedia: 'https://en.wikipedia.org/wiki/SHA-1',
  },
  {
    name: 'Chain Encrypt',
    category: 'Advanced Encryption',
    description: 'Chain Encrypt combines multiple encoding algorithms in a sequence determined by your encryption key. Each unique character in the key determines which encoders (Base64, Hex, URL, Base32, ROT13) are used and in what order. This creates a multi-layer encryption that is both simple and effective, applying encoders sequentially for encryption and reversing the process for decryption.',
    useCases: ['Multi-layer text encryption', 'Key-based encoding chains', 'Enhanced obfuscation', 'Educational cryptography'],
    example: 'Key "SECURE" → encrypts through 5 unique encoder stages',
    documentation: '/chain-encrypt',
  },
];

const categories = ['Two-Way Encoding', 'Two-Way Cipher', 'Advanced Encryption', 'One-Way Hashing'];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">About Cryptify</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              Cryptify is an all-in-one encryption, encoding, and hashing platform designed for developers, educators, and security professionals. All processing happens locally in your browser - nothing is sent to any server.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">
          {/* Overview */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-black dark:text-white">Fast Processing</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Instant results with live processing. See changes in real-time as you type.
                </p>
              </Card>
              <Card className="border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-black dark:text-white">Private & Secure</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  100% local processing. Your data never leaves your browser or device.
                </p>
              </Card>
              <Card className="border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-black dark:text-white">Educational</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn cryptography and encoding concepts with detailed algorithm explanations.
                </p>
              </Card>
            </div>
          </section>

          {/* Algorithms */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-black dark:text-white">Algorithms</h2>
            
            {categories.map((category) => {
              const categoryAlgos = algorithms.filter(a => a.category === category);
              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-2xl font-semibold text-black dark:text-white border-l-4 border-blue-600 pl-4">
                    {category}
                  </h3>
                  
                  <div className="space-y-6">
                    {categoryAlgos.map((algo, idx) => (
                      <Card key={idx} className="border border-gray-200 dark:border-gray-800 p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-xl font-bold text-black dark:text-white">
                            {algo.name}
                          </h4>
                          {algo.wikipedia ? (
                            <a
                              href={algo.wikipedia}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium whitespace-nowrap"
                            >
                              Wikipedia <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <a
                              href={algo.documentation}
                              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium whitespace-nowrap"
                            >
                              Learn More <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {algo.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">Use Cases:</p>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {algo.useCases.map((useCase, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  {useCase}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">Example:</p>
                            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-3 rounded text-gray-700 dark:text-gray-300 break-all">
                              {algo.example}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Technical Info */}
          <section className="space-y-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-black dark:text-white">Technical Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-black dark:text-white mb-2">Architecture</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Built with Next.js 16.1.4, React, TypeScript, and Tailwind CSS. Uses shadcn/ui components for consistent design.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-black dark:text-white mb-2">Privacy</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All algorithms run locally in your browser. No data is transmitted to any server or third-party service.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-black dark:text-white mb-2">Performance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Live processing with instant results. Optimized for large text inputs with real-time character counting.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-black dark:text-white mb-2">Accessibility</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dark/light theme support, keyboard navigation, responsive design for all devices.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
