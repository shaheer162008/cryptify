'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, ArrowLeftRight, Check } from 'lucide-react';
import { textToHex, hexToText } from '@/lib/encryption';

type DelimiterType = 'Space' | 'Colon' | 'Comma' | 'Semi-colon' | 'Line feed' | 'CRLF' | '0x' | '\\x' | 'None';

export default function HexPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [delimiter, setDelimiter] = useState<DelimiterType>('Space');
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }
    try {
      const result = mode === 'encode' ? textToHex(inputText, delimiter) : hexToText(inputText, delimiter);
      setOutputText(result);
    } catch (error) {
      setOutputText('');
    }
  }, [inputText, mode, delimiter]);

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
            <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">Hex</h1>
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <Button onClick={() => setMode('encode')} variant="ghost" size="sm" className={`${mode === 'encode' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-600 dark:text-gray-400'} px-4 py-1 text-xs font-semibold transition-all`}>Encode</Button>
              <Button onClick={() => setMode('decode')} variant="ghost" size="sm" className={`${mode === 'decode' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-600 dark:text-gray-400'} px-4 py-1 text-xs font-semibold transition-all`}>Decode</Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value as DelimiterType)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-black dark:text-white"
            >
              <option value="Space">Space</option>
              <option value="Colon">Colon</option>
              <option value="Comma">Comma</option>
              <option value="Semi-colon">Semi-colon</option>
              <option value="Line feed">Line feed</option>
              <option value="CRLF">CRLF</option>
              <option value="0x">0x</option>
              <option value="\\x">\\x</option>
              <option value="None">None</option>
            </select>
            <Button onClick={switchMode} variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900">
              <ArrowLeftRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content - Side by Side */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
          {/* Input Panel */}
          <Card className="flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-sm font-semibold text-black dark:text-white">{mode === 'encode' ? 'Text Input' : 'Hex Input'}</span>
              <Button onClick={() => copyToClipboard(inputText, 'input')} variant="ghost" size="sm" disabled={!inputText} className="h-7 px-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30">
                {copiedInput ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to convert to hex...' : 'Enter hex to convert to text...'}
              className="flex-1 p-4 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none font-mono text-sm"
            />
          </Card>

          {/* Output Panel */}
          <Card className="flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-sm font-semibold text-black dark:text-white">{mode === 'encode' ? 'Hex Output' : 'Text Output'}</span>
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
          <span>Live processing enabled</span>
          <span>{mode === 'encode' ? `${inputText.length} characters` : `${inputText.replace(/\s/g, '').length} hex characters`}</span>
        </div>
      </div>
    </div>
  );
}
