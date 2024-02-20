import { utf8 } from "@scure/base";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { KMSAlgorithmCipher, KMSAlgorithmKey } from "./types";

/**
 * Encrypts a message with AES-256-GCM
 *
 * @param key The key to use for encryption
 * @param message The message to encrypt
 */
export async function encrypt(key: KMSAlgorithmKey, message: string): Promise<KMSAlgorithmCipher> {
  if (typeof window !== "undefined") {
    const nonce = window.crypto.getRandomValues(new Uint8Array(12));
    const instance = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: nonce,
      },
      key as CryptoKey,
      utf8.decode(message)
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
 * Decrypts a message with AES-256-GCM
 *
 * @param key The key to use for decryption
 * @param cipher The cipher to decrypt
 */
export async function decrypt(key: KMSAlgorithmKey, cipher: KMSAlgorithmCipher): Promise<string> {
  if (typeof window !== "undefined") {
    const instance = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: cipher.nonce,
      },
      key as CryptoKey,
      cipher.text
    );

    return utf8.encode(new Uint8Array(instance));
  } else {
    const instance = createDecipheriv("aes-256-gcm", key as Uint8Array, cipher.nonce);
    const tag = cipher.text.slice(-16);
    const encryptedText = cipher.text.slice(0, -16);
    instance.setAuthTag(tag);

    return instance.update(encryptedText, undefined, "utf8") + instance.final("utf8");
  }
}
