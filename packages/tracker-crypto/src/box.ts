import { base64url, utf8 } from "@scure/base";
import { box, randomBytes } from "tweetnacl";

import { NaclBoxKey, parse } from "./common";

/**
 * Formatted key with the public base64 encoded from the key pair.
 */
export const boxPublicKeyRegex = /^trpkit\.naclbox\.pk\.([a-zA-Z0-9-_]{43})$/;

/**
 * Formatted key with the secret base64 encoded from the key pair.
 */
export const boxSecretKeyRegex = /^trpkit\.naclbox\.sk\.([a-zA-Z0-9-_]{43})$/;

/**
 * Formatted message with the public key, nonce and ciphertext base64 encoded.
 */
export const boxMessageRegex =
  /^trpkit\.naclbox\.([a-zA-Z0-9-_]{43}=?)\.([a-zA-Z0-9-_]{32})\.([a-zA-Z0-9-_]{22,}={0,2})$/;

/**
 * Encodes a key with a prefix.
 *
 * @param key - The key to encode.
 * @param prefix - The prefix to use.
 */
export function encodeBoxKey(key: Uint8Array, prefix: string): string {
  return `trpkit.naclbox.${prefix}.${base64url.encode(key)}`;
}

/**
 * Generates a new key pair.
 */
export function generateBoxKeyPair(): NaclBoxKey {
  const keyPair = box.keyPair();
  return {
    public: encodeBoxKey(keyPair.publicKey, "pk"),
    secret: encodeBoxKey(keyPair.secretKey, "sk"),
    keyPair,
  };
}

/**
 * Imports a key pair from a secret key.
 *
 * @param secretKey - The secret key to import.
 */
export function importBoxKeyPair(secretKey: string): NaclBoxKey {
  const secret = parse(secretKey, boxSecretKeyRegex);
  const keyPair = box.keyPair.fromSecretKey(secret);
  return {
    public: encodeBoxKey(keyPair.publicKey, "pk"),
    secret: encodeBoxKey(keyPair.secretKey, "sk"),
    keyPair,
  };
}

/**
 * Encrypts a message with a public key.
 *
 * @param input - The input string to encrypt.
 * @param publicKey - The public key to encrypt the message with.
 */
export function boxEncrypt(input: string, publicKey: Uint8Array): string {
  const nonce = randomBytes(box.nonceLength);
  const keyPair = box.keyPair();
  const ciphertext = box(utf8.decode(input), nonce, publicKey, keyPair.secretKey);

  return `trpkit.naclbox.${base64url.encode(publicKey)}.${base64url.encode(
    nonce
  )}.${base64url.encode(ciphertext)}`;
}

/**
 * Decrypts a message with a secret key.
 *
 * @param input - The input string to decrypt.
 * @param secretKey - The secret key to decrypt the message with.
 */
export function boxDecrypt(input: string, secretKey: Uint8Array): string {
  const match = input.match(boxMessageRegex);
  if (!match) {
    throw new Error("invalid input");
  }

  const [publicKey, nonce, ciphertext] = match.slice(1);
  const message = box.open(
    base64url.decode(ciphertext),
    base64url.decode(nonce),
    base64url.decode(publicKey),
    secretKey
  );

  if (!message) {
    throw new Error("invalid input");
  }

  return utf8.encode(message);
}
