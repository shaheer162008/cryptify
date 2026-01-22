'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { sha1Hash } from '@/lib/encryption';
import { Copy, Check, ExternalLink } from 'lucide-react';

export default function SHA1Page() {
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
      const result = sha1Hash(inputText);
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
            SHA1 Hash
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
                SHA1 Hash
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
          <span>Live hashing enabled - SHA1 is a one-way cryptographic hash function</span>
          <span>{inputText.length} characters</span>
        </div>

        {/* Info Section */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <p>
                <strong>SHA-1</strong> (Secure Hash Algorithm 1) is a cryptographic hash function that produces a 160-bit hash value. It's a one-way function and was widely used for security applications. However, SHA-1 is now considered cryptographically broken and unsuitable for further use due to discovered collision vulnerabilities.
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Use cases:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Git commit and object identification</li>
                <li>Digital signatures and certificates (legacy)</li>
                <li>File integrity verification</li>
                <li>Backwards compatibility (not for new systems)</li>
              </ul>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Example:</p>
              <p className="font-mono bg-white dark:bg-black p-2 rounded">"Hello" → "f7ff9e8b7b1cce4932b34241f1f97a4aaa7d6c4c"</p>
            </div>
            <a 
              href="https://en.wikipedia.org/wiki/SHA-1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium whitespace-nowrap"
            >
              Wikipedia <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
