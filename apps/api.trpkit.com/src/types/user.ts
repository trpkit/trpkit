export type User = {
  email: string;
  verifier: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSession = {
  email: string;
  clientEphemeral: string;
  serverEphemeralSecret: string;
  createdAt: Date; // TTL index to auto remove these
};
