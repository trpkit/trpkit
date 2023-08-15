import { base64url, hex, utf8 } from "@scure/base";
import { createHash, randomBytes } from "crypto";

import {
  KMSAesGcm256Key,
  KMSAlgorithm,
  KMSKey,
  KMSKeyUsage,
  KMSXChaCha20Poly1305Key,
  ParsedKMSKey,
} from "./types";

/**
 * Formats a key
 *
 * @param raw The raw key to format
 * @param algorithm The algorithm for the key
 */
export function formatKey(raw: Uint8Array, algorithm: KMSAlgorithm): string {
  return `kms/${algorithm}/${base64url.encode(raw)}`;
}

/**
 * Parses a key
 *
 * @param key The key to parse
 * @param algorithm The algorithm for the key
 * @param usage The usage for the key
 */
export async function parseKey(key: KMSKey, usage?: KMSKeyUsage): Promise<ParsedKMSKey> {
  const algorithm = key.match(KMSAesGcm256Key) ? "aesgcm256" : "xchacha20poly1305";

  return {
    raw: await importKey(key, algorithm, usage),
    algorithm: algorithm,
    fingerprint: await getKeyFingerprint(key),
  };
}

/**
 * Generates a new key
 *
 * @param algorithm The algorithm for the key
 */
export function generateKey(algorithm: KMSAlgorithm = "aesgcm256"): KMSKey {
  if (typeof window !== "undefined") {
    const key = window.crypto.getRandomValues(new Uint8Array(32));
    return formatKey(key, algorithm);
  } else {
    const key = randomBytes(32);
    return formatKey(key, algorithm);
  }
}

/**
 * Imports a key
 *
 * @param key The key to import
 * @param algorithm The algorithm for the key
 * @param usage The usage for the key
 */
export async function importKey(
  key: KMSKey,
  algorithm: KMSAlgorithm,
  usage?: KMSKeyUsage
): Promise<CryptoKey | Uint8Array> {
  const match = key.match(algorithm === "aesgcm256" ? KMSAesGcm256Key : KMSXChaCha20Poly1305Key);
  if (!match) {
    throw new Error("The key does not match the expected format");
  }

  const raw = base64url.decode(match.groups!.key);

  if (typeof window !== "undefined" && algorithm !== "xchacha20poly1305") {
    return await window.crypto.subtle.importKey(
      "raw",
      raw,
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      usage ? [usage] : ["encrypt", "decrypt"]
    );
  } else {
    return raw;
  }
}

/**
 * Exports a key
 *
 * @param key The key to export
 * @param algorithm The algorithm for the key
 */
export async function exportKey(key: CryptoKey, algorithm: KMSAlgorithm): Promise<KMSKey> {
  if (algorithm === "xchacha20poly1305") {
    throw new Error("The xchacha20poly1305 algorithm is not supported for export");
  }

  const raw = await window.crypto.subtle.exportKey("raw", key);
  return formatKey(new Uint8Array(raw), "aesgcm256");
}

/**
 * Gets the fingerprint of a key
 *
 * @param key The key to get the fingerprint of
 */
export async function getKeyFingerprint(key: KMSKey): Promise<string> {
  const data = utf8.decode(key);

  if (typeof window !== "undefined") {
    const hash = await window.crypto.subtle.digest("SHA-256", data);
    return hex.encode(new Uint8Array(hash)).slice(0, 8);
  } else {
    const hash = createHash("sha256");
    hash.update(data);
    return hash.digest("hex").slice(0, 8);
  }
}
