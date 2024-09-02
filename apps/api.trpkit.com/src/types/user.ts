export type User = {
  email: string;
  credentials: UserCredential;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCredential = {
  verifier: string;
  salt: string;
  // 2FA
};

export type UserSession = {
  email: string;
  clientEphemeral: string;
  serverEphemeralSecret: string;
  createdAt: Date; // TTL index to auto remove these
};
