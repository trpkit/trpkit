export type User = {
  email: string;
  credentials: UserCredential;
  kms: UserKMS;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCredential = {
  verifier: string;
  salt: string;
  // 2FA
};

export type UserKMS = {
  masterSalt: string;
  keychain: string;
};

export type UserSession = {
  email: string;
  clientEphemeral: string;
  serverEphemeralSecret: string;
  createdAt: Date; // TTL index to auto remove these
};
