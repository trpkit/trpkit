import { utf8 } from "@scure/base";
import { pbkdf2, randomBytes } from "crypto";

/**
 * Generate a random salt.
 */
export function generateSalt(): Uint8Array {
  if (typeof window !== "undefined") {
    return window.crypto.getRandomValues(new Uint8Array(32));
  } else {
    return randomBytes(32);
  }
}

/**
 * Derive a key from a password and salt.
 *
 * @param password The password to derive the key from.
 * @param salt The salt to use.
 */
export async function pbkdf2DeriveBytes(password: string, salt: Uint8Array): Promise<Uint8Array> {
  if (typeof window !== "undefined") {
    const key = await window.crypto.subtle.importKey(
      "raw",
      utf8.decode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );

    return new Uint8Array(
      await window.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: {
            name: "SHA-256",
          },
        },
        key,
        32 << 3
      )
    );
  } else {
    return new Promise((resolve, reject) => {
      pbkdf2(password, salt, 100000, 32, "sha256", (err, key) => {
        if (err) {
          return reject(err);
        }

        return resolve(new Uint8Array(key));
      });
    });
  }
}
