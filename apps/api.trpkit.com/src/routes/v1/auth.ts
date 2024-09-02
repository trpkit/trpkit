import { env } from "@/env";
import { ConflictError, ForbiddenError, NotFoundError, ValidationError } from "@/errors";
import { signToken } from "@/lib/jwt";
import { mongo } from "@/lib/mongo";
import type { User, UserSession } from "@/types/user";
import { Router } from "express";
import { deriveSession, generateEphemeral } from "secure-remote-password/server";
import { z } from "zod";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  verifier: z.string().length(344, "Invalid SRP verifier length"),
  salt: z.string().length(44, "Invalid SRP salt length"),
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

router.post("/auth/register", async (req, res, next) => {
  try {
    // Validate request body with zod
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((error) => error.message).join(", "));
    }

    const { email, verifier, salt } = parsed.data;

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
      verifier,
      salt,
      createdAt,
      updatedAt: createdAt,
    });

    // TODO future audit log implementation

    // Create token to log in user
    const userId = result.insertedId.toString();
    const token = await signToken(userId);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      domain: env.COOKIE_DOMAIN,
      sameSite: env.COOKIE_DOMAIN ? "lax" : undefined,
    });
    res.status(201);
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

    const { secret, public: serverEphemeral } = generateEphemeral(user.verifier);

    // Store user session
    await db.collection<UserSession>("user-sessions").insertOne({
      email,
      clientEphemeral,
      serverEphemeralSecret: secret,
      createdAt: new Date(),
    });

    res.status(200).json({
      email,
      salt: user.salt,
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
      user.salt,
      email,
      user.verifier,
      clientProof
    );

    // TODO future 2FA implementation
    // TODO future audit log

    // Create token to log in user
    const token = await signToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      domain: env.COOKIE_DOMAIN,
      sameSite: env.COOKIE_DOMAIN ? "lax" : undefined,
    });

    res.status(200).json({
      serverSession: serverSession.proof,
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

/**
 * Log user out
 *
 * 202 - Successfully processed logout request
 * 401 - User not logged in (ideally should just return 202 with expired cookie)
 */
router.delete("/auth/logout", (_req, res) => {
  // validate user is logged in
  // create ttl from current token
  // store token in blacklist collection with ttl (using mongodb ttl index)
  // store logout event in audit logs for user

  // create set-cookie header for clearing token
  res.status(202);
});

/**
 * Enable 2FA
 *
 * 200 - 2FA enabled
 * 400 - 2FA already enabled
 * 401 - User not logged in
 */
router.post("/auth/mfa", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa disabled
  // create 2fa secret and pass into body
  // store 2fa status as pending
  // create new token with 2fa enabled (indicates 2fa is pending)
  // store 2fa status change event in audit logs for user

  // set cookie header for token
  res.status(200);
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

/**
 * Verify 2FA setup process
 *
 * 200 - 2FA setup successful
 * 400 - 2FA code invalid
 * 403 - 2FA code incorrect
 */
router.post("/auth/mfa/verify", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa not disabled
  // validate user has 2fa not enabled
  // verify code user input
  // generate backup codes (8 codes) and pass into body
  // store 2fa status as enabled
  // create new token with 2fa enabled
  // store 2fa status change event in audit logs for user

  res.status(200);
  // set cookie header for token
});

export default router;