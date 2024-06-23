import { base64 } from "@scure/base";
import { decrypt as aesDecrypt, encrypt as aesEncrypt } from "./algorithm";
import { inject as keyInject, parse as keyParse } from "./key";
import {
  type KMSAlgorithmKey,
  type KMSKey,
  type KMSMessage,
  KMSMessageRegex,
  type KMSParsedKey,
} from "./types";

/**
 * Serializes a KMS message
 *
 * @param fingerprint The fingerprint of the key
 * @param nonce The nonce used for encryption
 * @param text The encrypted text
 */
export function serialize(fingerprint: string, nonce: Uint8Array, text: Uint8Array) {
  return `kms/${fingerprint}/${base64.encode(nonce)}/${base64.encode(text)}`;
}

/**
 * Encrypts a message with a key
 *
 * @param message The message to encrypt
 * @param key The key to use for encryption
 */
export async function encrypt(message: string, key: KMSKey | KMSParsedKey): Promise<KMSMessage> {
  if (typeof key === "string") {
    // biome-ignore lint/style/noParameterAssign: this will be changed soon
    key = await keyParse(key, "encrypt");
  }

  const { text, nonce } = await aesEncrypt(key.raw, message);
  return serialize(key.fingerprint, nonce, text);
}

/**
 * Decrypts a message with a key
 *
 * @param message The message to decrypt
 * @param key The key to use for decryption
 */
export async function decrypt(message: KMSMessage, key: KMSKey | KMSParsedKey): Promise<string> {
  const match = message.match(KMSMessageRegex);
  if (!match) {
    throw new Error("Invalid KMS message");
  }

  // biome-ignore lint/style/noNonNullAssertion: n/c
  const nonce = match.groups!.nonce;
  // biome-ignore lint/style/noNonNullAssertion: n/c
  const text = match.groups!.text;

  let finalKey: KMSAlgorithmKey;
  if (typeof key === "string") {
    finalKey = await keyInject(key, "decrypt");
  } else {
    finalKey = key.raw;
  }

  return await aesDecrypt(finalKey, {
    text: base64.decode(text),
    nonce: base64.decode(nonce),
  });
}

/**
 * Returns the fingerprint of a KMS message
 *
 * @param message The message to get the fingerprint from
 */
export function fingerprint(message: KMSMessage) {
  const match = message.match(KMSMessageRegex);
  if (!match) {
    throw new Error("Invalid KMS message");
  }

  // biome-ignore lint/style/noNonNullAssertion: this will be changed soon
  return match.groups!.fingerprint;
}
