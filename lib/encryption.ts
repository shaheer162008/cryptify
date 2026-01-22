import base64 from 'base-64';
import MD5 from 'md5.js';

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

