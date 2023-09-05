import { base64 } from "@scure/base";
import nacl from "tweetnacl";

import { KMSKey, messageEncrypt } from "@trpkit/kms";

export type Keychain = {
  signature: nacl.SignKeyPair;
  sharing: nacl.BoxKeyPair;
};

export type EncryptedKeychain = {
  signature: {
    secret: string;
    public: string;
  };
  sharing: {
    secret: string;
    public: string;
  };
};

export function createKeychain(): Keychain {
  return {
    signature: nacl.sign.keyPair(),
    sharing: nacl.box.keyPair(),
  };
}

export async function encryptKeychain(
  keychain: Keychain,
  keychainKey: KMSKey
): Promise<EncryptedKeychain> {
  return {
    signature: {
      secret: await messageEncrypt(base64.encode(keychain.signature.secretKey), keychainKey),
      public: base64.encode(keychain.signature.publicKey),
    },
    sharing: {
      secret: await messageEncrypt(base64.encode(keychain.sharing.secretKey), keychainKey),
      public: base64.encode(keychain.sharing.publicKey),
    },
  };
}
