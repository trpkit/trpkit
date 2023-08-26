// The algorithm key can be a CryptoKey or a Uint8Array
export type AlgorithmKey = CryptoKey | Uint8Array;

// The algorithm cipher contains the encrypted text and the nonce
export type AlgorithmCipher = {
  text: Uint8Array;
  nonce: Uint8Array;
};

// The KMS message is a string that contains the fingerprint, nonce and ciphertext
export type KMSMessage = string;

// The KMS message regex is used to parse the KMS message
export const KMSMessageRegex =
  /^kms\/(?<fingerprint>[0-9a-fA-F]{8})\/(?<nonce>[a-zA-Z0-9-_]{16})\/(?<ciphertext>[a-zA-Z0-9-_]{22,})={0,2}$/;

// The KMS key is a string that contains the key
export type KMSKey = string;

// The serialized KMS key is an object that contains the raw key and the fingerprint
export type SerializedKMSKey = {
  raw: AlgorithmKey;
  fingerprint: string;
};

// The KMS key usage is the usage of the key
export type KMSKeyUsage = "encrypt" | "decrypt";

// The KMS key regex is used to parse the KMS key
export const KMSKeyRegex = /^kms\/(?<key>[a-zA-Z0-9-_]{43}=?)$/;

// The KMS key fingerprint length is the length of the fingerprint
export const KMSKeyFingerprintLength = 8;

// The KMS key length is the length of the key
export const KMSKeyLength = 32;
