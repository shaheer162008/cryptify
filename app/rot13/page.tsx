'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, ArrowLeftRight, Check, ExternalLink } from 'lucide-react';
import { rot13 } from '@/lib/encryption';

export default function ROT13Page() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  // Live processing on input change
  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      // ROT13 is self-inverse; treat encode/decode as the same
      const result = rot13(inputText);
      setOutputText(result);
    } catch (error) {
      setOutputText('');
    }
  }, [inputText, mode]);

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

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  return (
    <div className="h-screen bg-white dark:bg-black flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 md:p-6 gap-4 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">ROT13</h1>
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <Button
                onClick={() => setMode('encode')}
                variant="ghost"
                size="sm"
                className={`${mode === 'encode' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-600 dark:text-gray-400'} px-4 py-1 text-xs font-semibold transition-all`}
              >
                Encode
              </Button>
              <Button
                onClick={() => setMode('decode')}
                variant="ghost"
                size="sm"
                className={`${mode === 'decode' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-600 dark:text-gray-400'} px-4 py-1 text-xs font-semibold transition-all`}
              >
                Decode
              </Button>
            </div>
          </div>
          <Button onClick={switchMode} variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900">
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Content - Side by Side */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
          {/* Input Panel */}
          <Card className="flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-sm font-semibold text-black dark:text-white">Input</span>
              <Button onClick={() => copyToClipboard(inputText, 'input')} variant="ghost" size="sm" disabled={!inputText} className="h-7 px-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30">
                {copiedInput ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to apply ROT13..."
              className="flex-1 p-4 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none font-mono text-sm"
            />
          </Card>

          {/* Output Panel */}
          <Card className="flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-sm font-semibold text-black dark:text-white">Output</span>
              <Button onClick={() => copyToClipboard(outputText, 'output')} variant="ghost" size="sm" disabled={!outputText} className="h-7 px-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30">
                {copiedOutput ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Result will appear here automatically..."
              className="flex-1 p-4 bg-gray-50 dark:bg-gray-950 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none font-mono text-sm"
            />
          </Card>
        </div>

        {/* Info Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-xs text-gray-600 dark:text-gray-400">
          <span>Live processing enabled - ROT13 is self-inverse</span>
          <span>{inputText.length} characters</span>
        </div>

        {/* Info Section */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <p>
                <strong>ROT13</strong> is a simple letter substitution cipher that replaces each letter with the letter 13 positions after it in the alphabet. It's a special case of the Caesar cipher with a shift of 13. Since ROT13 operates on 26 letters, applying it twice returns the original text (it's self-inverse).
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Use cases:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Simple obfuscation of text (not secure encryption)</li>
                <li>Internet forums for spoiler text</li>
                <li>Historical cipher education</li>
                <li>Quick reversible text transformation</li>
              </ul>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Example:</p>
              <p className="font-mono bg-white dark:bg-black p-2 rounded">"Hello World" → "Uryyb Jbeyq"</p>
            </div>
            <a 
              href="https://en.wikipedia.org/wiki/ROT13" 
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
