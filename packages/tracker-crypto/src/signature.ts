import { base64url, utf8 } from "@scure/base";
import { sign } from "tweetnacl";

import { NaclSignatureKey, parse } from "./common";

/**
 * Formatted key with the public base64 encoded from the key pair.
 */
export const signaturePublicKeyRegex = /^trpkit\.naclsignature\.pk\.([a-zA-Z0-9-_]{43})$/;

/**
 * Formatted key with the secret base64 encoded from the key pair.
 */
export const signatureSecretKeyRegex = /^trpkit\.naclsignature\.sk\.([a-zA-Z0-9-_]{86})$/;

/**
 * Formatted message with the signature base64 encoded.
 */
export const signatureRegex = /^trpkit\.naclsignature\.([a-zA-Z0-9-_]{86,}={0,2})$/;

/**
 * Encodes a key with a prefix.
 *
 * @param key - The key to encode.
 * @param prefix - The prefix to use.
 */
export function encodeSignatureKey(key: Uint8Array, prefix: string): string {
  return `trpkit.naclsignature.${prefix}.${base64url.encode(key)}`;
}

/**
 * Generates a new key pair.
 */
export function generateSignatureKeyPair(): NaclSignatureKey {
  const keyPair = sign.keyPair();
  return {
    public: encodeSignatureKey(keyPair.publicKey, "pk"),
    secret: encodeSignatureKey(keyPair.secretKey, "sk"),
    keyPair,
  };
}

/**
 * Imports a key pair from a secret key.
 *
 * @param secretKey - The secret key to import.
 */
export function importSignatureKeyPair(secretKey: string): NaclSignatureKey {
  const secret = parse(secretKey, signatureSecretKeyRegex);
  const keyPair = sign.keyPair.fromSecretKey(secret);
  return {
    public: encodeSignatureKey(keyPair.publicKey, "pk"),
    secret: encodeSignatureKey(keyPair.secretKey, "sk"),
    keyPair,
  };
}

/**
 * Signs a message with a secret key.
 *
 * @param input - The message to sign.
 * @param secretKey - The secret key to use.
 */
export function makeSignature(input: string, secretKey: Uint8Array): string {
  const signature = sign(utf8.decode(input), secretKey);
  return `trpkit.naclsignature.${base64url.encode(signature)}`;
}

/**
 * Verifies a message with a public key.
 *
 * @param input - The message to verify.
 * @param publicKey - The public key to use.
 */
export function verifySignature(input: string, publicKey: Uint8Array): string {
  const match = input.match(signatureRegex);
  if (!match) {
    throw new Error("invalid input");
  }

  const unverifiedSignature = match[1];
  const signature = sign.open(base64url.decode(unverifiedSignature), publicKey);

  if (!signature) {
    throw new Error("invalid input");
  }

  return utf8.encode(signature);
}
