import { base64url } from "@scure/base";

import { decryptAesGcm, encryptAesGcm } from "./ciphers/native/aes-gcm";
import { decryptXChaCha20Poly1305, encryptXChaCha20Poly1305 } from "./ciphers/xchacha20-poly1305";
import { parseKey } from "./key";
import {
  KMSAesGcm256Message,
  KMSAlgorithm,
  KMSKey,
  KMSMessage,
  KMSXChaCha20Poly1305Message,
  ParsedKMSKey,
} from "./types";

/**
 * Formats a message
 *
 * @param algorithm The algorithm for the message
 * @param fingerprint The fingerprint for the message
 * @param nonce The nonce for the message
 * @param cipher The cipher for the message
 */
export function formatMessage(
  algorithm: KMSAlgorithm,
  fingerprint: string,
  nonce: Uint8Array,
  cipher: Uint8Array
): KMSMessage {
  return `kms/${algorithm}/${fingerprint}/${base64url.encode(nonce)}/${base64url.encode(cipher)}`;
}

/**
 * Encrypts a message
 *
 * @param message The message to encrypt
 * @param key The key to encrypt the message with
 */
export async function encryptMessage(
  message: string,
  key: KMSKey | ParsedKMSKey
): Promise<KMSMessage> {
  if (typeof key === "string") {
    key = await parseKey(key, "encrypt");
  }

  if (key.algorithm === "aesgcm256") {
    const { text, nonce } = await encryptAesGcm(key.raw, message);
    return formatMessage(key.algorithm, key.fingerprint, nonce, text);
  } else {
    const { text, nonce } = encryptXChaCha20Poly1305(key.raw, message);
    return formatMessage(key.algorithm, key.fingerprint, nonce, text);
  }
}

/**
 * Decrypts a message
 *
 * @param message The message to decrypt
 * @param key The key to decrypt the message with
 */
export async function decryptMessage(
  message: KMSMessage,
  key: KMSKey | ParsedKMSKey
): Promise<string> {
  if (typeof key === "string") {
    key = await parseKey(key, "decrypt");
  }

  const match = message.match(
    key.algorithm === "aesgcm256" ? KMSAesGcm256Message : KMSXChaCha20Poly1305Message
  );
  if (!match) {
    throw new Error("The message does not match the expected format");
  }

  const nonce = base64url.decode(match.groups!.nonce);
  const cipher = base64url.decode(match.groups!.cipher);

  return key.algorithm === "aesgcm256"
    ? decryptAesGcm(key.raw, { nonce, text: cipher })
    : decryptXChaCha20Poly1305(key.raw, { nonce, text: cipher });
}

/**
 * Gets the fingerprint for a message
 *
 * @param message The message to get the fingerprint for
 */
export function getMessageFingerprint(message: KMSMessage): string {
  const match1 = message.match(KMSAesGcm256Message);

  if (!match1) {
    const match2 = message.match(KMSXChaCha20Poly1305Message);

    if (!match2) {
      throw new Error("The message does not match the expected format");
    }

    return match2.groups!.fingerprint;
  }

  return match1.groups!.fingerprint;
}
