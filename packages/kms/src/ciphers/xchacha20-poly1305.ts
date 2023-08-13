import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { bytesToUtf8, utf8ToBytes } from "@noble/ciphers/utils";
import { randomBytes } from "crypto";

import { CipherEncryptionResult } from "../types";

/**
 * Encrypts a message using XChaCha20-Poly1305 algorithm.
 *
 * @param key The key to use for encryption.
 * @param message The message to encrypt.
 */
export function encryptXChaCha20Poly1305(
  key: CryptoKey | Uint8Array,
  message: string
): CipherEncryptionResult {
  // We are using native approach for generating random bytes instead of using @noble's randomBytes to stay consistent with the aes-gcm implementation.
  let nonce;
  if (typeof window !== "undefined") {
    nonce = window.crypto.getRandomValues(new Uint8Array(24));
  } else {
    nonce = randomBytes(24);
  }

  const instance = xchacha20poly1305(key as Uint8Array, nonce);

  return {
    nonce,
    text: instance.encrypt(utf8ToBytes(message)),
  };
}

/**
 * Decrypts a message using XChaCha20-Poly1305 algorithm.
 *
 * @param key The key to use for decryption.
 * @param cipher The cipher to decrypt.
 */
export function decryptXChaCha20Poly1305(
  key: CryptoKey | Uint8Array,
  cipher: CipherEncryptionResult
): string {
  const instance = xchacha20poly1305(key as Uint8Array, cipher.nonce);
  return bytesToUtf8(instance.decrypt(cipher.text));
}
