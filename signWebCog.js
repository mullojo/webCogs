// This JS file will contain the code to cryptographically sign any Web Cog

import { encode, decode } from 'https://cdn.jsdelivr.net/npm/borc@1.1.1/dist/borc.min.js';
import { nacl } from 'https://cdn.jsdelivr.net/npm/tweetnacl@1.0.3/nacl-fast.min.js';

// Generates a new Ed25519 key pair
export function generateKeyPair() {
  return nacl.sign.keyPair();
}

// Signs the content using the private key
export function signContent(content, privateKey) {
  const messageUint8 = new TextEncoder().encode(content);
  const signature = nacl.sign.detached(messageUint8, privateKey);
  return {
    content,
    signature: Array.from(signature),
  };
}

// Verifies the signed content using the public key
export function verifyContent(signedContent, publicKey) {
  const { content, signature } = signedContent;
  const messageUint8 = new TextEncoder().encode(content);
  const signatureUint8 = new Uint8Array(signature);
  return nacl.sign.detached.verify(messageUint8, signatureUint8, publicKey);
}

// Computes the SHA-256 hash of the content
export async function hashContent(content) {
  const msgUint8 = new TextEncoder().encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
