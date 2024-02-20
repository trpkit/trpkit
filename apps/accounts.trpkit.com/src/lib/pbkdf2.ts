/**
 * Generates a specified number of random bytes.
 */
export function generateRandomBytes(length: number): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(length));
}

/**
 * Derives a key from a password using the PBKDF2 algorithm.
 */
export async function pbkdf2DeriveBytes(
  password: string,
  salt: Uint8Array,
  length: number,
  hash: "SHA-256" | "SHA-384" | "SHA-512" = "SHA-512",
  rounds: number = 100000
): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const key = await window.crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  return new Uint8Array(
    await window.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: rounds,
        hash: {
          name: hash,
        },
      },
      key,
      length << 3
    )
  );
}
