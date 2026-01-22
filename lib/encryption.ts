import base64 from 'base-64';

// Algorithm 1: Base64 Encoding
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

// Algorithm 2: Simple Caesar Cipher (Shift by 3)
export const caesarEncrypt = (text: string, shift: number = 3): string => {
  return text
    .split('')
    .map((char) => {
      if (/[a-z]/.test(char)) {
        return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
      }
      if (/[A-Z]/.test(char)) {
        return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
      }
      return char;
    })
    .join('');
};

export const caesarDecrypt = (text: string, shift: number = 3): string => {
  return caesarEncrypt(text, 26 - shift);
};

// Algorithm 3: ROT13 (Special case of Caesar with shift 13)
export const rot13Encrypt = (text: string): string => {
  return caesarEncrypt(text, 13);
};

export const rot13Decrypt = (text: string): string => {
  return caesarEncrypt(text, 13); // ROT13 is its own inverse
};

// Algorithm 4: Simple Substitution Cipher
const substitutionKey =
  'qwertyuiopasdfghjklzxcvbnm';
const substitutionAlphabet = 'abcdefghijklmnopqrstuvwxyz';

export const substitutionEncrypt = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map((char) => {
      const index = substitutionAlphabet.indexOf(char);
      return index !== -1 ? substitutionKey[index] : char;
    })
    .join('');
};

export const substitutionDecrypt = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map((char) => {
      const index = substitutionKey.indexOf(char);
      return index !== -1 ? substitutionAlphabet[index] : char;
    })
    .join('');
};

// Algorithm 5: Atbash Cipher (Reverse alphabet)
export const atbashEncrypt = (text: string): string => {
  return text
    .split('')
    .map((char) => {
      if (/[a-z]/.test(char)) {
        return String.fromCharCode(219 - char.charCodeAt(0));
      }
      if (/[A-Z]/.test(char)) {
        return String.fromCharCode(155 - char.charCodeAt(0));
      }
      return char;
    })
    .join('');
};

export const atbashDecrypt = (text: string): string => {
  return atbashEncrypt(text); // Atbash is its own inverse
};
