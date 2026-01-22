'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CryptifyAboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-gradient-to-br from-black to-gray-900 dark:from-gray-950 dark:to-black text-white p-6 md:p-12 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/cryptify">
            <Button variant="ghost" size="sm" className="mb-4 text-gray-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cryptify
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Cryptify Cipher Documentation</h1>
          <p className="text-gray-300">Technical details about the custom XOR-based cipher</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">
        {/* Overview */}
        <Card className="border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-black dark:text-white">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Cryptify</strong> is a custom position-based XOR cipher developed for the Cryptify encryption platform. It uses the seed key <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">"CRYPTIFY"</code> and applies XOR operations at each character position to transform plaintext into ciphertext and vice versa.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            The cipher is <strong>reversible</strong>, meaning applying it twice to the same text returns the original plaintext. Both encryption and decryption use the same algorithm.
          </p>
        </Card>

        {/* Algorithm Details */}
        <Card className="border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-black dark:text-white">Algorithm Details</h2>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-black dark:text-white">Seed Key</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The fixed seed key is: <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono">"CRYPTIFY"</code> (8 characters)
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-black dark:text-white">Operation</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>For each character at position <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono">i</code> in the input text</li>
              <li>Get the seed character at position <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono">i % 8</code> (cycling through the 8-character seed)</li>
              <li>Perform XOR operation: <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono">result_char = input_char XOR seed_char</code></li>
              <li>Convert the result to a single character</li>
              <li>Repeat for all characters in the input</li>
            </ol>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-black dark:text-white">Example Walkthrough</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Encrypting <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono">"Hi"</code> with seed <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono">"CRYPTIFY"</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 font-mono text-sm">
              <li>'H' (72) XOR 'C' (67) = 7</li>
              <li>'i' (105) XOR 'R' (82) = 55</li>
              <li>Result: bytes that convert to visible characters</li>
            </ul>
          </div>
        </Card>

        {/* Key Properties */}
        <Card className="border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-black dark:text-white">Key Properties</h2>
          
          <ul className="space-y-3">
            <li>
              <strong className="text-black dark:text-white">Reversible:</strong>
              <p className="text-gray-700 dark:text-gray-300">Applying the cipher twice returns the original text (self-inverse property of XOR)</p>
            </li>
            <li>
              <strong className="text-black dark:text-white">Deterministic:</strong>
              <p className="text-gray-700 dark:text-gray-300">Same input always produces the same output</p>
            </li>
            <li>
              <strong className="text-black dark:text-white">Position-Dependent:</strong>
              <p className="text-gray-700 dark:text-gray-300">The output depends on both the character and its position in the text</p>
            </li>
            <li>
              <strong className="text-black dark:text-white">Educational:</strong>
              <p className="text-gray-700 dark:text-gray-300">Demonstrates fundamental concepts of XOR-based cryptography</p>
            </li>
          </ul>
        </Card>

        {/* Security Considerations */}
        <Card className="border border-gray-200 dark:border-gray-800 p-6 space-y-4 border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950">
          <h2 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">⚠️ Security Considerations</h2>
          
          <p className="text-yellow-900 dark:text-yellow-200">
            <strong>This cipher is NOT suitable for protecting sensitive data.</strong>
          </p>
          
          <ul className="space-y-2 text-yellow-900 dark:text-yellow-200">
            <li>• Single fixed seed key means all users share the same encryption key</li>
            <li>• XOR with a repeating key is vulnerable to frequency analysis</li>
            <li>• No authentication or integrity checks</li>
            <li>• Vulnerable to known-plaintext attacks</li>
            <li>• Not suitable for cryptographic security applications</li>
          </ul>
          
          <p className="text-yellow-900 dark:text-yellow-200 font-semibold">
            Use this cipher only for educational purposes or non-critical obfuscation.
          </p>
        </Card>

        {/* Use Cases */}
        <Card className="border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-black dark:text-white">Intended Use Cases</h2>
          
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✓ Learning how XOR-based ciphers work</li>
            <li>✓ Understanding cryptographic concepts</li>
            <li>✓ Text obfuscation (non-security)</li>
            <li>✓ Reversible text transformation</li>
            <li>✗ Protecting sensitive data</li>
            <li>✗ Secure communication</li>
            <li>✗ Compliance or regulatory requirements</li>
          </ul>
        </Card>

        {/* Try It Out */}
        <Card className="border border-gray-200 dark:border-gray-800 p-6 space-y-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Try It Out</h2>
          <p className="text-blue-900 dark:text-blue-200">
            Ready to encrypt or decrypt text with Cryptify?
          </p>
          <Link href="/cryptify">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Go to Cryptify Tool
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
