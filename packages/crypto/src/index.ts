import { xsalsa20poly1305 } from "@noble/ciphers/salsa";
import { randomBytes } from "@noble/ciphers/webcrypto";
import { x25519 } from "@noble/curves/ed25519";
import { hkdf } from "@noble/hashes/hkdf";
import { sha256 } from "@noble/hashes/sha256";
import { concatBytes } from "@noble/hashes/utils";
import { ml_kem768 } from "@noble/post-quantum/ml-kem";
import { base64url, utf8 } from "@scure/base";

type EncodedKeyPair = {
  public: string;
  secret: string;
};

type KeyPair = {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
};

type ReturnedKeyPair = EncodedKeyPair & {
  keyPair: KeyPair;
};

export function generateKeyPair(): ReturnedKeyPair {
  const privateKey = x25519.utils.randomPrivateKey();
  const publicKey = x25519.getPublicKey(privateKey);

  return {
    public: encodeKey(publicKey, "pk"),
    secret: encodeKey(privateKey, "sk"),
    keyPair: {
      publicKey: publicKey,
      secretKey: privateKey,
    },
  };
}

export const secretKeyRegex = /^trpkit\.box\.sk\.([a-zA-Z0-9-_]{43})$/;
export const publicKeyRegex = /^trpkit\.box\.pk\.([a-zA-Z0-9-_]{43})$/;
const messageRegex =
  /^trpkit\.box\.([a-zA-Z0-9-_]{43}=?)\.([a-zA-Z0-9-_]{32})\.([a-zA-Z0-9-_]{22,}={0,2})$/;

export function importKeyPair(secretKey: string): ReturnedKeyPair {
  const privateKey = parse(secretKey, secretKeyRegex);
  const publicKey = x25519.getPublicKey(privateKey);

  return {
    public: encodeKey(publicKey, "pk"),
    secret: encodeKey(privateKey, "sk"),
    keyPair: {
      publicKey: publicKey,
      secretKey: privateKey,
    },
  };
}

function encodeKey(key: Uint8Array, prefix: "pk" | "sk") {
  return `trpkit.box.${prefix}.${base64url.encode(key)}`;
}

export function parse(input: string, regex: RegExp) {
  const match = input.match(regex);
  if (!match) {
    // TODO better error message
    throw new Error("Invalid input");
  }

  return base64url.decode(match[1]);
}

export function encrypt(input: string, publicKey: Uint8Array, pqPublicKey: Uint8Array): string {
  const nonce = randomBytes(xsalsa20poly1305.nonceLength);

  // Generate x25519 ephemeral key pair
  const keyPair = generateKeyPair();
  // Analytics script config contains the encoded public key, it is automatically decoded into Uint8Array when the script loads
  const sharedSecret = x25519.getSharedSecret(keyPair.keyPair.secretKey, publicKey);

  // ML-KEM 768 encapsulation
  const { cipherText: pqCipherText, sharedSecret: pqSharedSecret } =
    ml_kem768.encapsulate(pqPublicKey);

  // Concatenate the shared secrets
  const combinedSecrets = concatBytes(sharedSecret, pqSharedSecret);

  // Derive the final symmetric key using HKDF
  const finalKey = hkdf(sha256, combinedSecrets, undefined, undefined, 32);

  // Encrypt the payload with xsalsa20poly1305 using the final symmetric key
  const cipher = xsalsa20poly1305(finalKey, nonce);
  const cipherText = cipher.encrypt(utf8.decode(input));

  return `trpkit.box.${base64url.encode(keyPair.keyPair.publicKey)}.${base64url.encode(pqCipherText)}.${base64url.encode(nonce)}.${base64url.encode(cipherText)}`;
}

export function decrypt(input: string, secretKey: Uint8Array, pqSecretKey: Uint8Array): string {
  const match = input.match(messageRegex);
  if (!match) {
    // TODO better error message
    throw new Error("Invalid input");
  }

  const [publicKeyEncoded, pqCipherTextEncoded, nonceEncoded, cipherTextEncoded] = match.slice(1);
  const publicKey = base64url.decode(publicKeyEncoded); // x25519 public key
  const pqCipherText = base64url.decode(pqCipherTextEncoded); // ML-KEM 768 cipher text
  const nonce = base64url.decode(nonceEncoded);
  const cipherText = base64url.decode(cipherTextEncoded);

  // x25519 shared secret
  const sharedSecret = x25519.getSharedSecret(secretKey, publicKey);

  // ML-KEM 768 decapsulation
  const pqSharedSecret = ml_kem768.decapsulate(pqCipherText, pqSecretKey);

  // Concatenate the shared secrets
  const combinedSecrets = concatBytes(sharedSecret, pqSharedSecret);

  // Derive the final symmetric key using HKDF
  const finalKey = hkdf(sha256, combinedSecrets, undefined, undefined, 32);

  // Decrypt the payload
  const cipher = xsalsa20poly1305(finalKey, nonce);
  const message = cipher.decrypt(cipherText);

  return utf8.encode(message);
}
