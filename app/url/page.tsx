'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RotateCw } from 'lucide-react';
import { urlEncode, urlDecode } from '@/lib/encryption';

export default function URLPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<'input' | 'output' | null>(null);

  // Live processing on input change
  useEffect(() => {
    setError('');
    setCopiedField(null);

    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'encode') {
        const result = urlEncode(inputText);
        setOutputText(result);
      } else {
        const result = urlDecode(inputText);
        setOutputText(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
      setOutputText('');
    }
  }, [inputText, mode]);

  const copyToClipboard = (text: string, field: 'input' | 'output') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            URL Encoder/Decoder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Encode and decode text for safe use in URLs (RFC 3986 compliant)
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="encode" value={mode} onValueChange={(v) => setMode(v as 'encode' | 'decode')} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          {/* Input Card */}
          <Card className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="input" className="text-sm font-semibold text-black dark:text-white">
                {mode === 'encode' ? 'Text Input' : 'URL Input'}
              </label>
              {inputText && (
                <button
                  onClick={() => copyToClipboard(inputText, 'input')}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded transition"
                >
                  <Copy size={14} />
                  {copiedField === 'input' ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <textarea
              id="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL-encoded text to decode...'}
              className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {inputText.length} characters
            </div>
          </Card>

          {/* Output Card */}
          <Card className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="output" className="text-sm font-semibold text-black dark:text-white">
                {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
              </label>
              {outputText && !error && (
                <button
                  onClick={() => copyToClipboard(outputText, 'output')}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded transition"
                >
                  <Copy size={14} />
                  {copiedField === 'output' ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <textarea
              id="output"
              value={outputText}
              readOnly
              placeholder="Output will appear here..."
              className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none font-mono text-sm resize-none cursor-default"
            />
            {error && (
              <div className="text-xs text-red-600 dark:text-red-400 mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                ❌ {error}
              </div>
            )}
            {!error && outputText && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {outputText.length} characters
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={swapMode}
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <RotateCw size={16} className="mr-2" />
              Reverse
            </Button>
            <Button
              onClick={() => {
                setInputText('');
                setOutputText('');
                setError('');
              }}
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Clear
            </Button>
          </div>
        </Tabs>

        {/* Info Section */}
        <Card className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6 mt-8">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">📖 About URL Encoding</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>URL Encoding</strong> (also called Percent Encoding) converts special characters into a format safe for URLs.
            </p>
            <p>
              <strong>Examples:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Space → <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">%20</code></li>
                <li>@ → <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">%40</code></li>
                <li>& → <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">%26</code></li>
              </ul>
            </p>
            <p>
              <strong>Use Cases:</strong> Query parameters, form data, safe URLs, email addresses in URLs.
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Compliant with RFC 3986 standard.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
