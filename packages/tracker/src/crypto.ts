import { xsalsa20poly1305 } from "@noble/ciphers/salsa";
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

function generateKeyPair(): ReturnedKeyPair {
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

function encodeKey(key: Uint8Array, prefix: "pk" | "sk") {
  return `trpkit.box.${prefix}.${base64url.encode(key)}`;
}

export function parse(input: string) {
  const match = input.match(/^trpkit\.box\.sk\.([a-zA-Z0-9-_]+)$/);
  if (!match) {
    throw new Error("Invalid public key format");
  }

  return base64url.decode(match[1]);
}

export function encrypt(input: string, publicKey: Uint8Array, pqPublicKey: Uint8Array): string {
  // Validate x25519 public key length
  if (publicKey.length !== 32) {
    throw new Error("Invalid x25519 public key length");
  }

  // Validate ML-KEM public key length
  if (pqPublicKey.length !== 1184) {
    throw new Error("Invalid ML-KEM public key length");
  }

  // Ensure input is not empty
  if (!input) {
    throw new Error("Input must be a string");
  }

  const nonce = window.crypto.getRandomValues(new Uint8Array(xsalsa20poly1305.nonceLength));

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

  return `trpkit.pq.${base64url.encode(keyPair.keyPair.publicKey)}.${base64url.encode(pqCipherText)}.${base64url.encode(nonce)}.${base64url.encode(cipherText)}`;
}
