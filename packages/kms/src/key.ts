import { base64, hex, utf8 } from "@scure/base";
import { createHash, randomBytes } from "crypto";

import {
  KMSAlgorithmKey,
  KMSKey,
  KMSKeyFingerprintLength,
  KMSKeyLength,
  KMSKeyRegex,
  KMSKeyUsage,
  KMSParsedKey,
} from "./types";

/**
 * Serialize a raw key to a KMS key
 *
 * @param raw Raw key
 */
export function serialize(raw: Uint8Array) {
  return `kms/${base64.encode(raw)}`;
}

/**
 * Parse a KMS key to a raw key
 *
 * @param key KMS key
 * @param usage Key usage
 */
export async function parse(key: KMSKey, usage?: KMSKeyUsage): Promise<KMSParsedKey> {
  return {
    raw: await inject(key, usage),
    fingerprint: await fingerprint(key),
  };
}

/**
 * Generate a new KMS key
 */
export function generate(): KMSKey {
  if (typeof window !== "undefined") {
    const key = window.crypto.getRandomValues(new Uint8Array(KMSKeyLength));
    return serialize(key);
  } else {
    const key = randomBytes(KMSKeyLength);
    return serialize(key);
  }
}

/**
 * Inject a KMS key
 *
 * @param key KMS key
 * @param usage Key usage
 */
export async function inject(key: KMSKey, usage?: KMSKeyUsage): Promise<KMSAlgorithmKey> {
  const match = key.match(KMSKeyRegex);
  if (!match) {
    throw new Error("Invalid KMS key");
  }

  const raw = base64.decode(match.groups!.key);

  if (typeof window !== "undefined") {
    return await window.crypto.subtle.importKey(
      "raw",
      raw,
      { name: "AES-GCM", length: 256 },
      true,
      usage ? [usage] : ["encrypt", "decrypt"]
    );
  } else {
    return raw;
  }
}

/**
 * Dump a CryptoKey to a KMS key
 *
 * @param key CryptoKey
 */
export async function dump(key: CryptoKey): Promise<KMSKey> {
  const raw = await window.crypto.subtle.exportKey("raw", key);
  return serialize(new Uint8Array(raw));
}

/**
 * Get the fingerprint of a KMS key
 *
 * @param key KMS key
 */
export async function fingerprint(key: KMSKey): Promise<string> {
  const data = utf8.decode(key);

  if (typeof window !== "undefined") {
    const hash = -(await window.crypto.subtle.digest("SHA-256", data));
    return hex.encode(new Uint8Array(hash)).slice(0, KMSKeyFingerprintLength);
  } else {
    const hash = createHash("sha256");
    hash.update(data);
    return hash.digest("hex").slice(0, KMSKeyFingerprintLength);
  }
}
