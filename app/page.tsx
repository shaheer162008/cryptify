'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { base64Encrypt, base64Decrypt } from '@/lib/encryption';
import { Copy, RefreshCw, Zap } from 'lucide-react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleProcess = () => {
    try {
      if (!inputText.trim()) {
        setOutputText('');
        return;
      }
      const result = mode === 'encrypt' ? base64Encrypt(inputText) : base64Decrypt(inputText);
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
    <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header - macOS Style */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-3">
            Cryptify
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light">
            Base64 Encoder & Decoder
          </p>
        </div>

        {/* Main Card - Clean macOS Style */}
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="bg-white dark:bg-gray-950 p-8 md:p-12">
            {/* Mode Selector */}
            <div className="mb-8">
              <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
                <Button
                  onClick={() => {
                    setMode('encrypt');
                    setOutputText('');
                  }}
                  variant={mode === 'encrypt' ? 'default' : 'ghost'}
                  className={`${
                    mode === 'encrypt'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  } font-semibold px-6 py-2 rounded-md transition-all`}
                >
                  Encode
                </Button>
                <Button
                  onClick={() => {
                    setMode('decrypt');
                    setOutputText('');
                  }}
                  variant={mode === 'decrypt' ? 'default' : 'ghost'}
                  className={`${
                    mode === 'decrypt'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  } font-semibold px-6 py-2 rounded-md transition-all`}
                >
                  Decode
                </Button>
              </div>
            </div>

            {/* Input/Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Input */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-black dark:text-white mb-3">
                  Input
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text here..."
                  className="h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none"
                />
              </div>

              {/* Output */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-black dark:text-white mb-3">
                  Output
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Result will appear here..."
                  className="h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleProcess}
                className="bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-semibold px-6 py-2 transition-all"
              >
                <Zap className="w-4 h-4 mr-2" />
                {mode === 'encrypt' ? 'Encode' : 'Decode'}
              </Button>

              <Button
                onClick={swapTexts}
                variant="outline"
                className="border-2 border-black text-black dark:border-white dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-semibold px-6 py-2 transition-all"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Swap
              </Button>

              <Button
                onClick={copyToClipboard}
                variant="outline"
                disabled={!outputText}
                className="border-2 border-black text-black dark:border-white dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-semibold px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>

              <Button
                onClick={reset}
                variant="outline"
                className="border-2 border-black text-black dark:border-white dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-semibold px-6 py-2 transition-all"
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg p-6 bg-black text-white dark:bg-white dark:text-black">
            <h3 className="text-lg font-semibold mb-3">About Base64</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Base64 is a binary-to-text encoding scheme that uses only 64 printable characters. It's commonly used to transmit data over text-based protocols.
            </p>
          </Card>

          <Card className="border-0 shadow-lg p-6 bg-gray-100 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Features</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>✓ Instant encoding & decoding</li>
              <li>✓ Copy results with one click</li>
              <li>✓ Swap modes instantly</li>
              <li>✓ macOS-inspired design</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
