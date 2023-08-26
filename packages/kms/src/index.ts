export { encrypt as aesEncrypt, decrypt as aesDecrypt } from "./algorithm";

export {
  serialize as keySerialize,
  parse as keyParse,
  generate as keyGenerate,
  inject as keyInject,
  dump as keyDump,
  fingerprint as keyFingerprint,
} from "./key";

export {
  create as keychainCreate,
  inject as keychainInject,
  dump as keychainDump,
} from "./keychain";

export {
  serialize as messageSerialize,
  encrypt as messageEncrypt,
  decrypt as messageDecrypt,
  fingerprint as messageFingerprint,
} from "./message";

export type {
  KMSAlgorithmKey,
  KMSAlgorithmCipher,
  KMSMessage,
  KMSKey,
  KMSParsedKey,
  KMSKeyUsage,
  KMSBaseKeychainEntry,
  KMSKeychainEntry,
  KMSSerializedKeychainEntry,
  KMSKeychain,
} from "./types";

export { KMSMessageRegex, KMSKeyRegex, KMSKeyFingerprintLength, KMSKeyLength } from "./types";
