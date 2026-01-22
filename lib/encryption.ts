import base64 from 'base-64';
import MD5 from 'md5.js';
import sha1 from 'sha1';

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

