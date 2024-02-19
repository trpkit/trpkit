import { base64, hex, utf8 } from "@scure/base";
import srpClient from "secure-remote-password/client";
import { pbkdf2DeriveBytes } from "@/lib/pbkdf2";

/**
 * Derives a private key from a user's credentials and a salt.
 */
async function derivePrivateKey(username: string, password: string, salt: string): Promise<string> {
  const bytes = await pbkdf2DeriveBytes(
    base64.encode(utf8.decode([username, password].join(":"))),
    hex.decode(salt),
    32,
    "SHA-256",
    100000
  );

  return hex.encode(bytes);
}

/**
 * Initiates the signup process for a new user, generating necessary SRP parameters.
 */
export async function clientSignup(username: string, password: string) {
  const salt = srpClient.generateSalt();
  const privateKey = await derivePrivateKey(username, password, salt);
  const verifier = srpClient.deriveVerifier(privateKey);

  return {
    username,
    salt: base64.encode(hex.decode(privateKey)),
    verifier: base64.encode(hex.decode(verifier)),
  };
}

/**
 * Performs the client-side operations required for a user to login.
 */
export async function clientLogin(
  username: string,
  password: string,
  salt: string,
  serverEphemeral: string
) {
  const saltHex = hex.encode(base64.decode(salt));
  const clientEphemeral = srpClient.generateEphemeral();
  const privateKey = await derivePrivateKey(username, password, saltHex);

  const session = srpClient.deriveSession(
    clientEphemeral.secret,
    hex.encode(base64.decode(serverEphemeral)),
    saltHex,
    username,
    privateKey
  );

  return {
    ephemeral: {
      public: base64.encode(hex.decode(clientEphemeral.public)),
      secret: base64.encode(hex.decode(clientEphemeral.secret)),
    },
    session: {
      key: base64.encode(hex.decode(session.key)),
      proof: base64.encode(hex.decode(session.proof)),
    },
  };
}

/**
 * Verifies the server's proof, completing the login process.
 */
export async function clientVerifyLogin(
  serverProof: string,
  clientEphemeral: srpClient.Ephemeral,
  session: srpClient.Session
) {
  srpClient.verifySession(
    hex.encode(base64.decode(clientEphemeral.public)),
    {
      key: hex.encode(base64.decode(session.key)),
      proof: hex.encode(base64.decode(session.proof)),
    },
    hex.encode(base64.decode(serverProof))
  );
}
