'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { md5Hash } from '@/lib/encryption';
import { Copy, Check } from 'lucide-react';

export default function MD5Page() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  // Live processing - automatic hashing
  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      const result = md5Hash(inputText);
      setOutputText(result);
    } catch (error) {
      setOutputText('');
    }
  }, [inputText]);

  const copyToClipboard = async (text: string, type: 'input' | 'output') => {
    if (!text) return;
    
    await navigator.clipboard.writeText(text);
    
    if (type === 'input') {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  return (
    <div className="h-screen bg-white dark:bg-black flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 md:p-6 gap-4 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
            MD5 Hash
          </h1>
        </div>

        {/* Main Content - Side by Side */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
          {/* Input Panel */}
          <Card className="flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-sm font-semibold text-black dark:text-white">
                Input
              </span>
              <Button
                onClick={() => copyToClipboard(inputText, 'input')}
                variant="ghost"
                size="sm"
                disabled={!inputText}
                className="h-7 px-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30"
              >
                {copiedInput ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to hash..."
              className="flex-1 p-4 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none font-mono text-sm"
            />
          </Card>

          {/* Output Panel */}
          <Card className="flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-sm font-semibold text-black dark:text-white">
                MD5 Hash
              </span>
              <Button
                onClick={() => copyToClipboard(outputText, 'output')}
                variant="ghost"
                size="sm"
                disabled={!outputText}
                className="h-7 px-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30"
              >
                {copiedOutput ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Hash will appear here automatically..."
              className="flex-1 p-4 bg-gray-50 dark:bg-gray-950 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none font-mono text-sm"
            />
          </Card>
        </div>

        {/* Info Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-xs text-gray-600 dark:text-gray-400">
          <span>Live hashing enabled - MD5 is a one-way cryptographic hash function</span>
          <span>{inputText.length} characters</span>
        </div>
      </div>
    </div>
  );
}
