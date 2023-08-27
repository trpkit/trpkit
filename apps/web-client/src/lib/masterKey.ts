import { base64 } from "@scure/base";

import { KMSKey, keySerialize } from "@trpkit/kms";

import { generateSalt, pbkdf2DeriveBytes } from "./pbkdf2";

interface CreateMasterKey {
  key: KMSKey;
  salt: string;
}

/**
 * Derive a master key from a password and salt.
 *
 * @param password The password to derive the key from.
 * @param salt The salt to use.
 */
async function deriveMasterKey(password: string, salt: string): Promise<KMSKey> {
  const key = await pbkdf2DeriveBytes(`trpkit:${password}`, base64.decode(salt));
  return keySerialize(key);
}

/**
 * Create a master key from a password.
 *
 * @param password The password to derive the key from.
 */
export async function createMasterKey(password: string): Promise<CreateMasterKey> {
  const salt = base64.encode(generateSalt());
  const key = await deriveMasterKey(password, salt);

  return {
    key,
    salt,
  };
}
