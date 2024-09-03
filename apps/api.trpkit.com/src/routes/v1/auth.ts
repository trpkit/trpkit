import { randomBytes } from "node:crypto";
import { env } from "@/env";
import { ConflictError, ForbiddenError, NotFoundError, ValidationError } from "@/errors";
import { signToken } from "@/lib/jwt";
import { mongo } from "@/lib/mongo";
import { type AuthenticatedRequest, authHandler } from "@/middlewares/authHandler";
import { type User, UserMFAStatus, type UserSession } from "@/types/user";
import { base32 } from "@scure/base";
import { Router } from "express";
import { buildURL, totp } from "micro-key-producer/lib/otp";
import { ObjectId } from "mongodb";
import { deriveSession, generateEphemeral } from "secure-remote-password/server";
import { z } from "zod";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  verifier: z.string().length(344, "Invalid SRP verifier length"),
  salt: z.string().length(44, "Invalid SRP salt length"),
  masterSalt: z.string(),
  keychain: z.string(),
});

const loginChallengeSchema = z.object({
  email: z.string().email(),
  clientEphemeral: z.string(), // Client ephemeral public (A)
});

const loginResponseSchema = z.object({
  email: z.string().email(),
  clientProof: z.string(), // Client proof (M)
  clientEphemeral: z.string(), // Client ephemeral public (A)
});

const mfaVerifySchema = z.object({
  code: z.string().length(6, "Invalid code length"),
});

router.post("/auth/register", async (req, res, next) => {
  try {
    // Validate request body with zod
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((error) => error.message).join(", "));
    }

    const { email, verifier, salt, masterSalt, keychain } = parsed.data;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    // Check to see if email exists
    const emailExists = (await db.collection<User>("users").countDocuments({ email })) > 0;
    if (emailExists) {
      throw new ConflictError("Email already registered.");
    }

    const createdAt = new Date();

    // Store user record
    const result = await db.collection<User>("users").insertOne({
      email,
      credentials: {
        verifier,
        salt,
        mfaStatus: UserMFAStatus.NeverSetup,
      },
      kms: {
        masterSalt,
        keychain,
      },
      createdAt,
      updatedAt: createdAt,
    });

    // TODO future audit log implementation

    // Create token to log in user
    const userId = result.insertedId.toString();
    const token = await signToken(userId);

    res.cookie(env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      domain: env.COOKIE_DOMAIN,
      sameSite: env.COOKIE_DOMAIN ? "lax" : undefined,
    });
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.post("/auth/login/challenge", async (req, res, next) => {
  try {
    // Validate request body with zod
    const parsed = loginChallengeSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((error) => error.message).join(", "));
    }

    const { email, clientEphemeral } = parsed.data;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const user = await db.collection<User>("users").findOne({ email });

    // Check to see if user exists
    if (!user) {
      // TODO create bogus salt & verifier and send back to client
      throw new NotFoundError("User");
    }

    const { secret, public: serverEphemeral } = generateEphemeral(user.credentials.verifier);

    // Store user session
    await db.collection<UserSession>("user-sessions").insertOne({
      email,
      clientEphemeral,
      serverEphemeralSecret: secret,
      createdAt: new Date(),
    });

    res.status(200).json({
      email,
      salt: user.credentials.salt,
      serverEphemeral,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/auth/login/response", async (req, res, next) => {
  try {
    // Validate request body with zod
    const parsed = loginResponseSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((error) => error.message).join(", "));
    }

    const { email, clientProof, clientEphemeral } = parsed.data;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    // Check to see if session exists
    const userSession = await db
      .collection<UserSession>("user-sessions")
      .findOne({ email, clientEphemeral });
    if (!userSession) {
      throw new ForbiddenError("Invalid SRP challenge");
    }

    // Check to see if user exists
    const user = await db.collection<User>("users").findOne({ email });
    if (!user) {
      throw new ForbiddenError("Invalid SRP challenge");
    }

    const serverSession = deriveSession(
      userSession.serverEphemeralSecret,
      clientEphemeral,
      user.credentials.salt,
      email,
      user.credentials.verifier,
      clientProof
    );

    // TODO future 2FA implementation
    // TODO future audit log

    // Create token to log in user
    const token = await signToken(user._id.toString());

    res.cookie(env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      domain: env.COOKIE_DOMAIN,
      sameSite: env.COOKIE_DOMAIN ? "lax" : undefined,
    });

    res.status(200).json({
      serverSession: serverSession.proof,
      masterSalt: user.kms.masterSalt,
      keychain: user.kms.keychain,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 2FA verification
 *
 * 200 - 2FA successfully verified
 * 400 - 2FA not enabled or code is incorrect
 * 403 - 2FA verification failed
 * 401 - User not logged in
 */
router.post("/auth/login/checkpoint", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // check if token 2fa is already verified and return master salt if so
  // validate user has 2fa enabled
  // verify if code is correct
  // create new token with 2fa enabled

  // set cookie header for token
  res.status(200);
});

router.delete("/auth/logout", (_req, res) => {
  // TODO probably wanna blacklist the token from being used until it expires

  res.clearCookie(env.COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    domain: env.COOKIE_DOMAIN,
    sameSite: env.COOKIE_DOMAIN ? "lax" : undefined,
  });
  res.status(202).end();
});

router.post("/auth/mfa", authHandler, async (req: AuthenticatedRequest, res, next) => {
  try {
    const secretBytes = randomBytes(20);
    const secret = base32.encode(secretBytes).replace(/=/g, "");

    const otpUrl = buildURL({
      secret: secretBytes,
      algorithm: "sha256",
      digits: 6,
      interval: 30,
    });

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    await db.collection<User>("users").updateOne(
      { _id: new ObjectId(req.user?.id) },
      {
        $set: {
          "credentials.mfa": secret,
          "credentials.mfaStatus": UserMFAStatus.SetupStarted,
        },
      }
    );

    res.status(200).json({ otpUrl });
  } catch (err) {
    next(err);
  }
});

/**
 * Disable 2FA
 *
 * 200 - 2FA disabled
 * 400 - 2FA not enabled
 * 401 - User not logged in
 */
router.delete("/auth/mfa", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa enabled
  // verify 2fa code
  // disable 2fa
  // create new token with updated 2fa status

  // set cookie header for token
  res.status(200);
});

router.post("/auth/mfa/verify", authHandler, async (req: AuthenticatedRequest, res, next) => {
  try {
    const parsed = mfaVerifySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((error) => error.message).join(", "));
    }

    const { code } = parsed.data;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const user = await db.collection<User>("users").findOne({ _id: new ObjectId(req.user?.id) });

    if (!user) {
      throw new NotFoundError("User");
    }

    if (!user.credentials?.mfa || user.credentials.mfaStatus !== UserMFAStatus.SetupStarted) {
      throw new ValidationError("MFA is not configured");
    }

    const secret = base32.decode(user.credentials.mfa);

    const isValid =
      totp(
        {
          secret,
          algorithm: "sha256",
          digits: 6,
          interval: 30,
        },
        0
      ) === code;

    if (!isValid) {
      throw new ForbiddenError("Invalid TOTP token");
    }

    // TODO generate backup codes

    await db
      .collection<User>("users")
      .updateOne(
        { _id: new ObjectId(req.user?.id) },
        { $set: { "credentials.mfaSetup": UserMFAStatus.Enabled } }
      );

    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

export default router;
