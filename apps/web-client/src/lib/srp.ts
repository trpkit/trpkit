import { base64, hex, utf8 } from "@scure/base";
import { deriveVerifier, generateSalt } from "secure-remote-password/client";

import { pbkdf2DeriveBytes } from "./pbkdf2";

interface CreateSrpVerifierAndSalt {
  salt: string;
  verifier: string;
}

/**
 * Derive a private key from a password and salt.
 *
 * @param password The password to derive the key from.
 * @param salt The salt to use.
 */
async function derivePrivateKey(password: string, salt: string): Promise<string> {
  const bytes = await pbkdf2DeriveBytes(
    base64.encode(utf8.decode(`trpkit:${password}`)),
    hex.decode(salt)
  );

  return hex.encode(bytes);
}

/**
 * Create a SRP verifier and salt from a password.
 *
 * @param password The password to derive the verifier and salt from.
 */
export async function createSrpVerifierAndSalt(
  password: string
): Promise<CreateSrpVerifierAndSalt> {
  const salt = generateSalt();
  const privateKey = await derivePrivateKey(password, salt);
  const verifier = deriveVerifier(privateKey);

  return {
    salt: base64.encode(hex.decode(salt)),
    verifier: base64.encode(hex.decode(verifier)),
  };
}
