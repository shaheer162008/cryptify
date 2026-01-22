import base64 from 'base-64';
import MD5 from 'md5.js';
import sha1 from 'sha1';
import * as aesjs from 'aes-js';
import { encode as hexEncode, decode as hexDecode } from '@stablelib/hex';

// Algorithm: Base64 Encoding
export const base64Encrypt = (text: string): string => {
  try {
    const encoded = base64.encode(text);
    return encoded;
  } catch (error) {
    throw new Error('Base64 encryption failed');
  }
};

export const base64Decrypt = (text: string): string => {
  try {
    const decoded = base64.decode(text);
    return decoded;
  } catch (error) {
    throw new Error('Base64 decryption failed');
  }
};

// Algorithm: MD5 Hash
export const md5Hash = (text: string): string => {
  try {
    const hash = new MD5().update(text).digest('hex');
    return hash;
  } catch (error) {
    throw new Error('MD5 hashing failed');
  }
};

// Algorithm: SHA1 Hash
export const sha1Hash = (text: string): string => {
  try {
    const hash = sha1(text);
    return hash;
  } catch (error) {
    throw new Error('SHA1 hashing failed');
  }
};

// Algorithm: AES Encryption/Decryption (ECB mode - compatible with CyberChef)
// Key format: Hex string of 32 characters (16 bytes = 128-bit)

const hexToBytes = (hexStr: string): Uint8Array => {
  try {
    // Remove spaces and convert to uppercase for consistency
    const cleanHex = hexStr.replace(/\s/g, '').toUpperCase();
    return hexDecode(cleanHex);
  } catch {
    throw new Error('Invalid hex key format');
  }
};

const bytesToHex = (bytes: Uint8Array): string => {
  try {
    return hexEncode(bytes).toLowerCase();
  } catch {
    throw new Error('Failed to encode bytes to hex');
  }
};

// Generate random 16-byte key and return as hex string (32 characters)
export const generateRandomAESKey = (): string => {
  try {
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    return bytesToHex(randomBytes);
  } catch {
    throw new Error('Failed to generate random key');
  }
};

// Convert any string/text to hex key (must result in 16 bytes)
export const stringToBase64Key = (input: string): string => {
  try {
    if (!input.trim()) {
      throw new Error('Input cannot be empty');
    }
    
    // Use MD5 hash to create exactly 16 bytes from any input
    const hash = new MD5().update(input).digest('hex');
    // MD5 already returns hex, which is 32 characters (16 bytes)
    return hash.toLowerCase();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to convert string to key');
  }
};

export const aesEncrypt = (text: string, hexKey: string = ''): string => {
  try {
    if (!hexKey.trim()) {
      throw new Error('Key is required');
    }
    
    // Validate key length - should be 32 hex characters (16 bytes)
    const cleanKey = hexKey.replace(/\s/g, '');
    if (cleanKey.length !== 32) {
      throw new Error(`Key must be exactly 32 hex characters (16 bytes), got ${cleanKey.length} characters`);
    }
    
    const keyBytes = hexToBytes(cleanKey);
    const textBytes = aesjs.utils.utf8.toBytes(text);
    
    // For texts not multiple of 16 bytes, pad with PKCS7
    const paddedLength = Math.ceil(textBytes.length / 16) * 16;
    const paddedBytes = new Uint8Array(paddedLength);
    paddedBytes.set(textBytes);
    
    // PKCS7 padding
    const paddingLength = paddedLength - textBytes.length;
    for (let i = textBytes.length; i < paddedLength; i++) {
      paddedBytes[i] = paddingLength;
    }
    
    const aesEcb = new aesjs.ModeOfOperation.ecb(keyBytes);
    const encryptedBytes = aesEcb.encrypt(paddedBytes);
    return bytesToHex(encryptedBytes);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'AES encryption failed');
  }
};

export const aesDecrypt = (encryptedHex: string, hexKey: string = ''): string => {
  try {
    if (!hexKey.trim()) {
      throw new Error('Key is required');
    }
    
    if (!encryptedHex.trim()) {
      throw new Error('Encrypted text is required');
    }
    
    // Validate key length - should be 32 hex characters (16 bytes)
    const cleanKey = hexKey.replace(/\s/g, '');
    if (cleanKey.length !== 32) {
      throw new Error(`Key must be exactly 32 hex characters (16 bytes), got ${cleanKey.length} characters`);
    }
    
    // Validate encrypted hex format - must be even number of hex characters
    const cleanEncrypted = encryptedHex.replace(/\s/g, '');
    if (cleanEncrypted.length % 2 !== 0) {
      throw new Error('Encrypted text must be valid hexadecimal (even number of characters)');
    }
    
    const keyBytes = hexToBytes(cleanKey);
    
    // Parse encrypted hex and validate it's multiple of 16 bytes (AES block size)
    const encryptedBytes = hexToBytes(cleanEncrypted);
    if (encryptedBytes.length % 16 !== 0) {
      throw new Error(`Encrypted data must be multiple of 16 bytes, got ${encryptedBytes.length} bytes`);
    }
    
    const aesEcb = new aesjs.ModeOfOperation.ecb(keyBytes);
    const decryptedBytes = aesEcb.decrypt(encryptedBytes);
    
    // Remove PKCS7 padding
    const lastByte = decryptedBytes[decryptedBytes.length - 1];
    let unpaddedLength = decryptedBytes.length;
    
    if (lastByte > 0 && lastByte <= 16) {
      // Verify padding
      let validPadding = true;
      for (let i = decryptedBytes.length - lastByte; i < decryptedBytes.length; i++) {
        if (decryptedBytes[i] !== lastByte) {
          validPadding = false;
          break;
        }
      }
      if (validPadding) {
        unpaddedLength = decryptedBytes.length - lastByte;
      }
    }
    
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes.slice(0, unpaddedLength));
    return decryptedText;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'AES decryption failed');
  }
};

// Algorithm: URL Encode/Decode (RFC 3986 compliant)
export const urlEncode = (text: string): string => {
  try {
    return encodeURIComponent(text);
  } catch (error) {
    throw new Error('URL encoding failed');
  }
};

export const urlDecode = (text: string): string => {
  try {
    return decodeURIComponent(text);
  } catch (error) {
    throw new Error('URL decoding failed');
  }
};

// Algorithm: Base32 Encoding/Decoding (RFC 4648)
const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export const base32Encode = (text: string): string => {
  try {
    const bytes = aesjs.utils.utf8.toBytes(text);
    let result = '';
    let bits = 0;
    let value = 0;

    for (let i = 0; i < bytes.length; i++) {
      value = (value << 8) | bytes[i];
      bits += 8;

      while (bits >= 5) {
        bits -= 5;
        result += BASE32_CHARS[(value >> bits) & 31];
      }
    }

    // Handle remaining bits
    if (bits > 0) {
      result += BASE32_CHARS[(value << (5 - bits)) & 31];
    }

    // Add padding
    while (result.length % 8 !== 0) {
      result += '=';
    }

    return result;
  } catch (error) {
    throw new Error('Base32 encoding failed');
  }
};

export const base32Decode = (text: string): string => {
  try {
    const input = text.replace(/=/g, '');
    let bits = 0;
    let value = 0;
    const bytes: number[] = [];

    for (let i = 0; i < input.length; i++) {
      const idx = BASE32_CHARS.indexOf(input[i].toUpperCase());
      if (idx === -1) {
        throw new Error(`Invalid Base32 character: ${input[i]}`);
      }

      value = (value << 5) | idx;
      bits += 5;

      if (bits >= 8) {
        bits -= 8;
        bytes.push((value >> bits) & 255);
      }
    }

    return aesjs.utils.utf8.fromBytes(new Uint8Array(bytes));
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Base32 decoding failed');
  }
};

// Algorithm: ROT13 Cipher (Rotate by 13 characters)
export const rot13 = (text: string): string => {
  try {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(start + (char.charCodeAt(0) - start + 13) % 26);
    });
  } catch (error) {
    throw new Error('ROT13 processing failed');
  }
};

// Algorithm: Ascii85 (Base85) Encode/Decode
// Minimal implementation compatible with CyberChef's default Ascii85 (no <~ ~> wrappers)
export const ascii85Encode = (text: string): string => {
  try {
    const bytes = aesjs.utils.utf8.toBytes(text);
    let output = "";
    for (let i = 0; i < bytes.length; i += 4) {
      const chunk = bytes.slice(i, Math.min(i + 4, bytes.length));
      const padding = 4 - chunk.length;

      let value = 0;
      for (let j = 0; j < chunk.length; j++) {
        value = (value << 8) | chunk[j];
      }
      value <<= (padding * 8);

      if (chunk.length === 4 && value === 0) {
        output += 'z';
        continue;
      }

      const chars = new Array(5);
      for (let k = 4; k >= 0; k--) {
        chars[k] = String.fromCharCode((value % 85) + 33);
        value = Math.floor(value / 85);
      }
      // For partial chunks, only emit chunk.length + 1 chars
      output += chars.slice(0, 5 - padding).join("");
    }
    return output;
  } catch (error) {
    throw new Error('Ascii85 encoding failed');
  }
};

export const ascii85Decode = (text: string): string => {
  try {
    const out: number[] = [];
    let i = 0;
    while (i < text.length) {
      const c = text[i];
      if (c === 'z') {
        out.push(0, 0, 0, 0);
        i += 1;
        continue;
      }

      const chunk = text.slice(i, Math.min(i + 5, text.length));
      const len = chunk.length;
      let value = 0;
      for (let j = 0; j < len; j++) {
        const code = chunk.charCodeAt(j);
        if (code < 33 || code > 117) {
          throw new Error('Invalid Ascii85 character');
        }
        value = value * 85 + (code - 33);
      }
      const padding = 5 - len;
      // Adjust for padding in final group
      for (let p = 0; p < padding; p++) {
        value *= 85;
      }

      const bytes = [
        (value >>> 24) & 0xff,
        (value >>> 16) & 0xff,
        (value >>> 8) & 0xff,
        value & 0xff,
      ];
      out.push(...bytes.slice(0, 4 - padding));
      i += len;
    }
    return aesjs.utils.utf8.fromBytes(new Uint8Array(out));
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Ascii85 decoding failed');
  }
};

// Algorithm: Hexadecimal Encoding/Decoding (like CyberChef's To Hex / From Hex)
// Supports multiple delimiters: Space (default), Colon, Comma, 0x prefix, \x prefix, None

interface HexDelimiterConfig {
  [key: string]: { pattern: RegExp; prepend: boolean };
}

const HEX_DELIMITERS: HexDelimiterConfig = {
  'Space': { pattern: / /g, prepend: false },
  'Colon': { pattern: /:/g, prepend: false },
  'Comma': { pattern: /,/g, prepend: false },
  'Semi-colon': { pattern: /;/g, prepend: false },
  'Line feed': { pattern: /\n/g, prepend: false },
  'CRLF': { pattern: /\r\n/g, prepend: false },
  '0x': { pattern: /0x/g, prepend: true },
  '\\x': { pattern: /\\x/g, prepend: true },
  'None': { pattern: /$^/g, prepend: false }, // Never matches - no delimiter
};

// Convert text to hexadecimal with specified delimiter (like CyberChef's To Hex)
export const textToHex = (text: string, delimiter: string = 'Space'): string => {
  try {
    const bytes = aesjs.utils.utf8.toBytes(text);
    const config = HEX_DELIMITERS[delimiter] || HEX_DELIMITERS['Space'];
    
    const output: string[] = [];
    
    for (let i = 0; i < bytes.length; i++) {
      const hex = bytes[i].toString(16).padStart(2, '0');
      
      if (config.prepend) {
        output.push(delimiter + hex);
      } else {
        output.push(hex);
      }
    }
    
    // Join with delimiter (if not prepended, add between items)
    if (config.prepend) {
      return output.join('');
    } else if (delimiter === 'None') {
      return output.join('');
    } else {
      return output.join(delimiter);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Text to Hex conversion failed');
  }
};

// Convert hexadecimal string to text with auto-detection of delimiter (like CyberChef's From Hex)
export const hexToText = (hexString: string, delimiter: string = 'Auto'): string => {
  try {
    let hexArray: string[] = [];
    
    if (delimiter === 'Auto' || delimiter === 'None') {
      // Auto-detect: split on any non-hex character or 0x/\x
      if (delimiter === 'Auto') {
        // Remove 0x and \x prefixes, then split on any non-hex character
        const normalized = hexString.replace(/0x/gi, '').replace(/\\x/g, '');
        hexArray = normalized.split(/[^a-fA-F0-9]+/).filter(s => s.length > 0);
      } else {
        // None: treat entire string as one continuous hex sequence
        hexArray = [hexString.replace(/\s/g, '')];
      }
    } else {
      // Use specified delimiter
      const config = HEX_DELIMITERS[delimiter];
      if (config?.prepend) {
        // For 0x and \x, remove the prefix and split
        hexArray = hexString.split(config.pattern).filter(s => s.length > 0);
      } else {
        // For other delimiters, split normally
        hexArray = hexString.split(new RegExp(config?.pattern.source || '')).filter(s => s.length > 0);
      }
    }
    
    const bytes: number[] = [];
    
    for (const hex of hexArray) {
      // Process 2 characters at a time (one byte)
      for (let i = 0; i < hex.length; i += 2) {
        const byteStr = hex.substr(i, 2);
        if (byteStr.length === 2) {
          const byte = parseInt(byteStr, 16);
          if (isNaN(byte)) {
            throw new Error(`Invalid hexadecimal value: ${byteStr}`);
          }
          bytes.push(byte);
        }
      }
    }
    
    if (bytes.length === 0) {
      throw new Error('No valid hexadecimal data found');
    }
    
    const uint8Array = new Uint8Array(bytes);
    return aesjs.utils.utf8.fromBytes(uint8Array);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Hex to Text conversion failed');
  }
};


