import { z } from "zod";

export const ZAuthRegistration = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  srp: z.object({
    salt: z.string(),
    verifier: z.string(),
  }),
  kms: z.object({
    salt: z.string(),
    recovery: z.string(),
    keychain: z.string(),
  }),
  keychain: z.object({
    signature: z.object({
      secret: z.string(),
      public: z.string(),
    }),
    sharing: z.object({
      secret: z.string(),
      public: z.string(),
    }),
  }),
});

export type AuthRegistration = z.infer<typeof ZAuthRegistration>;

export const ZAuthChallenge = z.object({
  email: z.string().email(),
  clientEphemeral: z.string(),
});

export type AuthChallenge = z.infer<typeof ZAuthChallenge>;

export const ZAuthVerify = z.object({
  email: z.string().email(),
  clientSession: z.string(),
});

export type AuthVerify = z.infer<typeof ZAuthVerify>;
