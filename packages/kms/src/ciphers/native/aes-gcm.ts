import { bytesToUtf8, utf8ToBytes } from "@noble/ciphers/utils";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

import { CipherEncryptionResult } from "../../types";

/**
 * Encrypts a message using AES-GCM algorithm.
 *
 * @param key The key to use for encryption.
 * @param message The message to encrypt.
 */
export async function encryptAesGcm(
  key: CryptoKey | Uint8Array,
  message: string
): Promise<CipherEncryptionResult> {
  if (typeof window !== "undefined") {
    const nonce = window.crypto.getRandomValues(new Uint8Array(12));
    const instance = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: nonce,
      },
      key as CryptoKey,
      utf8ToBytes(message)
    );

    return {
      nonce,
      text: new Uint8Array(instance),
    };
  } else {
    const nonce = randomBytes(12);
    const instance = createCipheriv("aes-256-gcm", key as Uint8Array, nonce);
    const encryptedText = instance.update(message, "utf8");
    instance.final();
    const tag = instance.getAuthTag();

    return {
      nonce,
      text: Buffer.concat([encryptedText, tag]),
    };
  }
}

/**
 * Decrypts a message using AES-GCM algorithm.
 *
 * @param key The key to use for decryption.
 * @param cipher The cipher to decrypt.
 */
export async function decryptAesGcm(
  key: CryptoKey | Uint8Array,
  cipher: CipherEncryptionResult
): Promise<string> {
  if (typeof window !== "undefined") {
    const instance = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: cipher.nonce,
      },
      key as CryptoKey,
      cipher.text
    );

    return bytesToUtf8(new Uint8Array(instance));
  } else {
    const instance = createDecipheriv("aes-256-gcm", key as Uint8Array, cipher.nonce);
    const tag = cipher.text.slice(-16);
    const encryptedText = cipher.text.slice(0, -16);
    instance.setAuthTag(tag);

    return instance.update(encryptedText, undefined, "utf8") + instance.final("utf8");
  }
}
