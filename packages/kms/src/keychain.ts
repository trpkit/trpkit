import { dump as keyDump, parse as keyParse, serialize as keySerialize } from "./key";
import { decrypt as messageDecrypt, encrypt as messageEncrypt } from "./message";
import type {
  KMSKey,
  KMSKeychain,
  KMSKeychainEntry,
  KMSMessage,
  KMSParsedKey,
  KMSSerializedKeychainEntry,
} from "./types";

/**
 * Create a new keychain
 *
 * @param keys Keys
 */
export async function create(keys: KMSKey[]): Promise<KMSKeychain> {
  const keychain: KMSKeychain = {};

  for (const key of keys) {
    const parsedKey = await keyParse(key);
    keychain[parsedKey.fingerprint] = {
      key: parsedKey,
      createdAt: Date.now(),
    };
  }

  return keychain;
}

/**
 * Inject a keychain
 *
 * @param encryptedKeychain Encrypted keychain
 * @param masterKey Master key
 */
export async function inject(
  encryptedKeychain: KMSMessage,
  masterKey: KMSKey
): Promise<KMSKeychain> {
  const decryptedKeychain = await messageDecrypt(encryptedKeychain, masterKey);
  const keys: KMSSerializedKeychainEntry[] = JSON.parse(decryptedKeychain);
  const keychain: KMSKeychain = {};

  for (const { key, ...rest } of keys) {
    const parsedKey = await keyParse(key);
    keychain[parsedKey.fingerprint] = {
      key: parsedKey,
      ...rest,
    };
  }

  return keychain;
}

/**
 * Dump a keychain to a KMS keychain
 *
 * @param keychain Keychain
 * @param masterKey Master key
 */
export async function dump(
  keychain: KMSKeychain,
  masterKey: KMSKey | KMSParsedKey
): Promise<KMSMessage> {
  const entries: KMSKeychainEntry[] = Object.values(keychain);
  const serializedEntries: KMSSerializedKeychainEntry[] = [];

  for (const entry of entries) {
    serializedEntries.push({
      key: (entry.key.raw as CryptoKey).algorithm
        ? await keyDump(entry.key.raw as CryptoKey)
        : keySerialize(entry.key.raw as Uint8Array),
      createdAt: entry.createdAt,
    });
  }

  return await messageEncrypt(JSON.stringify(serializedEntries), masterKey);
}
