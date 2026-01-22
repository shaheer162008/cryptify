import base64 from 'base-64';

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

