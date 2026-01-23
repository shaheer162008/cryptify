'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Copy, Check, Plus, Trash2, ChevronDown, Lock } from 'lucide-react';
import { base64Encrypt, base64Decrypt, textToHex, hexToText, urlEncode, urlDecode, base32Encode, base32Decode, rot13 } from '@/lib/encryption';

const ENCODER_DEFINITIONS = {
  0: { name: 'Base64', id: 0, fn: { encrypt: base64Encrypt, decrypt: base64Decrypt } },
  1: { name: 'Hex', id: 1, fn: { encrypt: (t: string) => textToHex(t, 'Space'), decrypt: (t: string) => hexToText(t, 'Space') } },
  2: { name: 'URL', id: 2, fn: { encrypt: urlEncode, decrypt: urlDecode } },
  3: { name: 'Base32', id: 3, fn: { encrypt: base32Encode, decrypt: base32Decode } },
  4: { name: 'ROT13', id: 4, fn: { encrypt: rot13, decrypt: rot13 } },
};

interface ChainItem {
  id: string;
  encoderId: number;
  count: number;
}

export default function ChainEncryptPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [chain, setChain] = useState<ChainItem[]>([{ id: '0', encoderId: 0, count: 1 }]);
  const [showConfig, setShowConfig] = useState(true);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [decryptKey, setDecryptKey] = useState('');

  // Memoize generated key
  const generatedKey = useMemo(() => {
    const keyParts = chain.map(item => `${item.encoderId}x${item.count}`).join('-');
    return keyParts || 'empty';
  }, [chain]);

  // Parse key to reconstruct chain
  const parseKeyToChain = (key: string): ChainItem[] => {
    try {
      const parts = key.split('-');
      return parts.map((part, index) => {
        const [encoderId, count] = part.split('x').map(Number);
        return {
          id: index.toString(),
          encoderId: encoderId || 0,
          count: count || 1,
        };
      });
    } catch {
      return [];
    }
  };

  // Manual processing function
  const handleProcess = async () => {
    if (!inputText.trim()) {
      return;
    }

    // For decrypt mode, validate key
    if (mode === 'decrypt' && !decryptKey.trim()) {
      return;
    }

    setIsProcessing(true);
    setOutputText('');

    // Use setTimeout to allow UI to update with spinner
    setTimeout(() => {
      try {
        let result = inputText;
        let processingChain = chain;

        if (mode === 'encrypt') {
          // Apply each algorithm with specified count
          for (const item of processingChain) {
            const encoder = ENCODER_DEFINITIONS[item.encoderId as keyof typeof ENCODER_DEFINITIONS];
            for (let i = 0; i < item.count; i++) {
              result = encoder.fn.encrypt(result);
            }
          }
        } else {
          // Parse key and reverse for decryption
          processingChain = parseKeyToChain(decryptKey);
          if (processingChain.length === 0) {
            throw new Error('Invalid key');
          }
          for (let i = processingChain.length - 1; i >= 0; i--) {
            const item = processingChain[i];
            const encoder = ENCODER_DEFINITIONS[item.encoderId as keyof typeof ENCODER_DEFINITIONS];
            for (let j = 0; j < item.count; j++) {
              result = encoder.fn.decrypt(result);
            }
          }
        }

        setOutputText(result);
      } catch {
        setOutputText('Error processing text');
      } finally {
        setIsProcessing(false);
      }
    }, 100);
  };

  const addToChain = () => {
    const newId = Math.random().toString();
    setChain([...chain, { id: newId, encoderId: 0, count: 1 }]);
  };

  const removeFromChain = (id: string) => {
    if (chain.length > 1) {
      setChain(chain.filter(item => item.id !== id));
    }
  };

  const updateChainItem = (id: string, field: 'encoderId' | 'count', value: number) => {
    setChain(chain.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const copyToClipboard = async (text: string, type: 'input' | 'output' | 'key') => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    if (type === 'input') {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } else if (type === 'output') {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const switchMode = () => {
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">Chain Encrypt</h1>
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <Button
              onClick={() => setMode('encrypt')}
              variant="ghost"
              size="sm"
              className={`${
                mode === 'encrypt'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-gray-600 dark:text-gray-400'
              } px-4 py-1 text-xs font-semibold transition-all`}
            >
              Encrypt
            </Button>
            <Button
              onClick={() => setMode('decrypt')}
              variant="ghost"
              size="sm"
              className={`${
                mode === 'decrypt'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-gray-600 dark:text-gray-400'
              } px-4 py-1 text-xs font-semibold transition-all`}
            >
              Decrypt
            </Button>
          </div>
        </div>

        {/* Configuration Section - Conditional Based on Mode */}
        {mode === 'encrypt' ? (
          <Card className="border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
            >
              <h2 className="text-lg font-semibold text-black dark:text-white">Configuration</h2>
              <ChevronDown className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${showConfig ? 'rotate-180' : ''}`} />
            </button>

            {showConfig && (
              <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-4">
              {/* Chain Configuration */}
              <div className="space-y-3">
                <h3 className="font-semibold text-black dark:text-white text-sm">Encoder Chain</h3>
                {chain.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-950 rounded-md">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-6">{index + 1}.</span>
                    
                    {/* Algorithm Select */}
                    <select
                      title="Select encoder algorithm"
                      value={item.encoderId}
                      onChange={(e) => updateChainItem(item.id, 'encoderId', parseInt(e.target.value))}
                      className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-black dark:text-white text-sm"
                    >
                      {Object.values(ENCODER_DEFINITIONS).map(encoder => (
                        <option key={encoder.id} value={encoder.id}>
                          {encoder.name}
                        </option>
                      ))}
                    </select>

                    {/* Count Input */}
                    <div className="flex items-center gap-1">
                      <label htmlFor={`count-${item.id}`} className="text-xs text-gray-600 dark:text-gray-400">Count:</label>
                      <input
                        id={`count-${item.id}`}
                        type="number"
                        min="1"
                        max="10"
                        value={item.count}
                        onChange={(e) => updateChainItem(item.id, 'count', parseInt(e.target.value) || 1)}
                        className="w-12 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-black dark:text-white text-sm"
                      />
                    </div>

                    {/* Remove Button */}
                    <Button
                      onClick={() => removeFromChain(item.id)}
                      variant="ghost"
                      size="sm"
                      disabled={chain.length === 1}
                      className="ml-auto text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {/* Add Button */}
                <Button
                  onClick={addToChain}
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-300 dark:border-gray-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Algorithm
                </Button>
              </div>

              {/* Generated Key Section */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-md">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">Generated Key:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-2 py-2 bg-white dark:bg-black text-black dark:text-white text-xs font-mono border border-blue-300 dark:border-blue-700 rounded break-all">
                    {generatedKey}
                  </code>
                  <Button
                    onClick={() => copyToClipboard(generatedKey, 'key')}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    {copiedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-200 mt-2">
                  This key represents your encryption chain. Share it to use the same configuration elsewhere.
                </p>
              </div>

              {/* Chain Visualization */}
              <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-md">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Chain Flow:</p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Input</span>
                  {chain.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">→</span>
                      <span className="px-2 py-1 bg-white dark:bg-black text-black dark:text-white rounded font-mono font-semibold">
                        {ENCODER_DEFINITIONS[item.encoderId as keyof typeof ENCODER_DEFINITIONS].name}
                        {item.count > 1 && `×${item.count}`}
                      </span>
                    </div>
                  ))}
                  <span className="text-gray-600 dark:text-gray-400">→</span>
                  <span className="text-gray-600 dark:text-gray-400">Output</span>
                </div>
              </div>
            </div>
          )}
        </Card>
        ) : (
          <Card className="border border-gray-200 dark:border-gray-800 p-4">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Decryption Key</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter the encryption key to decrypt your text. The key determines the algorithm chain and order.
              </p>
              <div className="flex flex-col gap-2">
                <label htmlFor="decrypt-key" className="text-sm font-medium text-black dark:text-white">
                  Key:
                </label>
                <input
                  id="decrypt-key"
                  type="text"
                  value={decryptKey}
                  onChange={(e) => setDecryptKey(e.target.value)}
                  placeholder="e.g., 0x1-2x3-1x1"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Format: encoderId×count-encoderId×count (e.g., 0×1-2×3 means Base64×1 then URL×3)
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Panel */}
          <Card className="flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-sm font-semibold text-black dark:text-white">
                {mode === 'encrypt' ? 'Plain Text' : 'Encrypted Text'}
              </span>
              <Button
                onClick={() => copyToClipboard(inputText, 'input')}
                variant="ghost"
                size="sm"
                disabled={!inputText}
                className="h-7 px-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30"
              >
                {copiedInput ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter encrypted text to decrypt...'}
              className="flex-1 p-4 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none font-mono text-sm"
            />
          </Card>

          {/* Output Panel */}
          <Card className="flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-sm font-semibold text-black dark:text-white">
                {mode === 'encrypt' ? 'Encrypted Text' : 'Plain Text'}
              </span>
              <Button
                onClick={() => copyToClipboard(outputText, 'output')}
                variant="ghost"
                size="sm"
                disabled={!outputText || isProcessing}
                className="h-7 px-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30"
              >
                {copiedOutput ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            {isProcessing ? (
              <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="lg" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Processing your text...</p>
                </div>
              </div>
            ) : (
              <textarea
                value={outputText}
                readOnly
                placeholder="Click the button above to process..."
                className="flex-1 p-4 bg-gray-50 dark:bg-gray-950 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none font-mono text-sm"
              />
            )}
          </Card>
        </div>

        {/* Process Button - Centered */}
        <div className="flex justify-center">
          <Button
            onClick={handleProcess}
            disabled={!inputText.trim() || isProcessing || (mode === 'decrypt' && !decryptKey.trim())}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2.5"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                {mode === 'encrypt' ? 'Encrypt Now' : 'Decrypt Now'}
              </>
            )}
          </Button>
        </div>

        {/* Info Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-xs text-gray-600 dark:text-gray-400">
          <span>Chain: {chain.map(item => `${ENCODER_DEFINITIONS[item.encoderId as keyof typeof ENCODER_DEFINITIONS].name}${item.count > 1 ? `×${item.count}` : ''}`).join(' → ')}</span>
          <span>{inputText.length} characters</span>
        </div>

        {/* Info Section */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <p>
              <strong>Chain Encrypt</strong> lets you create custom multi-layer encryption by selecting algorithms, their order, and repetition count. Each configuration generates a unique key that you can share or use with Cryptify cipher.
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">How to use:</p>
            {mode === 'encrypt' ? (
              <ul className="list-disc list-inside space-y-1">
                <li>Click &ldquo;Configuration&rdquo; to expand settings</li>
                <li>Add/remove algorithms and set how many times each runs</li>
                <li>Key auto-generates from your configuration</li>
                <li>Copy the generated key to share your encryption setup</li>
                <li>Type in input and click &ldquo;Encrypt Now&rdquo; to process</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                <li>Paste your encrypted text in the input field</li>
                <li>Enter the encryption key you received</li>
                <li>Click &ldquo;Decrypt Now&rdquo; to reveal the original text</li>
                <li>Key format: encoderId×count-encoderId×count (e.g., 0×1-2×3)</li>
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
