'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RotateCw } from 'lucide-react';
import { textToHex, hexToText } from '@/lib/encryption';

type DelimiterType = 'Space' | 'Colon' | 'Comma' | 'Semi-colon' | 'Line feed' | 'CRLF' | '0x' | '\\x' | 'None';

export default function HexPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [delimiter, setDelimiter] = useState<DelimiterType>('Space');
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
        const result = textToHex(inputText, delimiter);
        setOutputText(result);
      } else {
        const result = hexToText(inputText, delimiter);
        setOutputText(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
      setOutputText('');
    }
  }, [inputText, mode, delimiter]);

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
            Hexadecimal Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert text to hexadecimal and back with various delimiters (like CyberChef)
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="encode" value={mode} onValueChange={(v) => setMode(v as 'encode' | 'decode')} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="encode">Text → Hex</TabsTrigger>
            <TabsTrigger value="decode">Hex → Text</TabsTrigger>
          </TabsList>

          {/* Settings Card */}
          <Card className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 mb-6">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Settings</h2>
            
            <div className="mb-4">
              <label htmlFor="delimiter" className="block text-sm font-medium text-black dark:text-white mb-2">
                Delimiter
              </label>
              <select
                id="delimiter"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value as DelimiterType)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Space">Space</option>
                <option value="Colon">Colon (:)</option>
                <option value="Comma">Comma (,)</option>
                <option value="Semi-colon">Semi-colon (;)</option>
                <option value="Line feed">Line feed</option>
                <option value="CRLF">CRLF</option>
                <option value="0x">0x prefix</option>
                <option value="\\x">\\x prefix</option>
                <option value="None">No delimiter</option>
              </select>
            </div>

            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
              <p className="font-semibold mb-1">📋 Delimiter Examples:</p>
              <ul className="space-y-1">
                <li><strong>Space:</strong> 48 65 6c 6c 6f</li>
                <li><strong>Colon:</strong> 48:65:6c:6c:6f</li>
                <li><strong>0x:</strong> 0x480x650x6c0x6c0x6f</li>
                <li><strong>None:</strong> 48656c6c6f</li>
              </ul>
            </div>
          </Card>

          {/* Input Card */}
          <Card className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="input" className="text-sm font-semibold text-black dark:text-white">
                {mode === 'encode' ? 'Text Input' : 'Hex Input'}
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
              placeholder={mode === 'encode' ? 'Enter text to convert to hex...' : 'Enter hex to convert to text...'}
              className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {mode === 'encode' ? `${inputText.length} characters` : `${inputText.replace(/\s/g, '').length} hex characters`}
            </div>
          </Card>

          {/* Output Card */}
          <Card className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="output" className="text-sm font-semibold text-black dark:text-white">
                {mode === 'encode' ? 'Hex Output' : 'Text Output'}
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
                {mode === 'encode' ? `${outputText.length} hex characters` : `${outputText.length} characters`}
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
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">📖 About Hexadecimal</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Hexadecimal (Hex)</strong> is a base-16 number system using digits 0-9 and letters A-F. Each hexadecimal digit represents 4 bits, so 2 hex digits = 1 byte.
            </p>
            <p>
              <strong>Example:</strong> The text "Hi" converts to <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">48 69</code> in hex (with space delimiter).
            </p>
            <p>
              <strong>Common Uses:</strong> Color codes (#FF5733), memory addresses, binary data representation, cryptographic keys.
            </p>
            <p>
              <strong>Delimiters:</strong> Different formats support different delimiters to separate bytes - Space, Colon, Comma, 0x prefix, etc. This converter supports all common CyberChef delimiters.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
