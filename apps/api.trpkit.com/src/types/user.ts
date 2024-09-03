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
  mfa?: string;
  mfaStatus: UserMFAStatus;
  mfaBackupCodes?: string[];
};

export type UserKMS = {
  masterSalt: string;
  keychain: string;
};

export enum UserMFAStatus {
  NeverSetup = "neverSetup",
  SetupStarted = "setupInProgress",
  Enabled = "enabled",
  Disabled = "disabled",
}

export type UserSession = {
  email: string;
  clientEphemeral: string;
  serverEphemeralSecret: string;
  createdAt: Date; // TTL index to auto remove these
};
