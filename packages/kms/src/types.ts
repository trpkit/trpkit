export type CipherEncryptionResult = {
  nonce: Uint8Array;
  text: Uint8Array;
};

// Regex for verifying KMS keys
export const KMSAesGcm256Key = /^kms\/aesgcm256\/(?<key>[a-zA-Z0-9-_]{43}=?)$/;
export const KMSXChaCha20Poly1305Key = /^kms\/xchacha20poly1305\/(?<key>[a-zA-Z0-9-_]{43}=?)$/;

// The formatted key stored in our servers. we do not store the master key, only keychain keys.
export type KMSKey = string;

// The parsed key, which is the raw key and the fingerprint
export type ParsedKMSKey = {
  raw: CryptoKey | Uint8Array;
  fingerprint: string;
};

// The usage for the KMS key
export type KMSKeyUsage = "encrypt" | "decrypt";

// The algorithms supported by the KMS
export type KMSAlgorithm = "aesgcm256" | "xchacha20poly1305";
