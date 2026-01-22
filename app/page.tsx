'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  base64Encrypt,
  base64Decrypt,
  caesarEncrypt,
  caesarDecrypt,
  rot13Encrypt,
  rot13Decrypt,
  substitutionEncrypt,
  substitutionDecrypt,
  atbashEncrypt,
  atbashDecrypt,
} from '@/lib/encryption';
import { Copy, RefreshCw } from 'lucide-react';

const algorithms = [
  {
    id: 'base64',
    name: 'Base64',
    description: 'Encode and decode using Base64 encoding',
    encrypt: base64Encrypt,
    decrypt: base64Decrypt,
  },
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'Shift cipher with a fixed shift of 3',
    encrypt: caesarEncrypt,
    decrypt: caesarDecrypt,
  },
  {
    id: 'rot13',
    name: 'ROT13',
    description: 'Special Caesar cipher with shift of 13 (reverses itself)',
    encrypt: rot13Encrypt,
    decrypt: rot13Decrypt,
  },
  {
    id: 'substitution',
    name: 'Substitution Cipher',
    description: 'Simple substitution using a predefined key',
    encrypt: substitutionEncrypt,
    decrypt: substitutionDecrypt,
  },
  {
    id: 'atbash',
    name: 'Atbash Cipher',
    description: 'Reverse alphabet cipher (reverses itself)',
    encrypt: atbashEncrypt,
    decrypt: atbashDecrypt,
  },
];

export default function Home() {
  const [activeAlgo, setActiveAlgo] = useState('base64');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const algo = algorithms.find((a) => a.id === activeAlgo)!;

  const handleProcess = () => {
    try {
      if (!inputText.trim()) {
        setOutputText('');
        return;
      }
      const result =
        mode === 'encrypt' ? algo.encrypt(inputText) : algo.decrypt(inputText);
      setOutputText(result);
    } catch (error) {
      setOutputText(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('Copied to clipboard!');
    }
  };

  const swapTexts = () => {
    setInputText(outputText);
    setOutputText(inputText);
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
  };

  const reset = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Cryptify
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Simple Encryption & Decryption Tools
          </p>
        </div>

        {/* Algorithm Selection */}
        <Card className="p-6 mb-6 border-0 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Select Algorithm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {algorithms.map((algo) => (
              <Button
                key={algo.id}
                onClick={() => {
                  setActiveAlgo(algo.id);
                  setOutputText('');
                }}
                variant={activeAlgo === algo.id ? 'default' : 'outline'}
                className={activeAlgo === algo.id ? 'bg-blue-600' : ''}
              >
                {algo.name}
              </Button>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            {algo.description}
          </p>
        </Card>

        {/* Mode Selection */}
        <Card className="p-6 mb-6 border-0 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Mode
          </h2>
          <Tabs
            value={mode}
            onValueChange={(value) => {
              setMode(value as 'encrypt' | 'decrypt');
              setOutputText('');
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
              <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        {/* Input/Output */}
        <Card className="p-6 border-0 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Input Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to encrypt/decrypt..."
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Output */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Output Text
              </label>
              <textarea
                value={outputText}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button
              onClick={handleProcess}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </Button>
            <Button
              onClick={swapTexts}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Swap & Reverse Mode
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              disabled={!outputText}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Output
            </Button>
            <Button onClick={reset} variant="outline">
              Clear All
            </Button>
          </div>
        </Card>

        {/* Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border-0 shadow-lg bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              5 Simple Algorithms
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>✓ Base64 - Simple encoding</li>
              <li>✓ Caesar - Shift cipher</li>
              <li>✓ ROT13 - Reverse alphabet shift</li>
              <li>✓ Substitution - Key-based cipher</li>
              <li>✓ Atbash - Reverse alphabet</li>
            </ul>
          </Card>

          <Card className="p-4 border-0 shadow-lg bg-green-50 dark:bg-green-900/20">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Quick Tips
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Paste text and click encrypt/decrypt</li>
              <li>• Copy results with one click</li>
              <li>• Use Swap to reverse operations</li>
              <li>• Try different algorithms</li>
              <li>• All operations are instant</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
