import { env } from "@/env";
import { ForbiddenError, NotFoundError, ValidationError } from "@/errors";
import { signToken } from "@/lib/jwt";
import { mongo } from "@/lib/mongo";
import { Router } from "express";
import { deriveSession, generateEphemeral } from "secure-remote-password/server";
import { z } from "zod";

const router = Router();

const loginChallengeSchema = z.object({
  email: z.string().email(),
  clientEphemeral: z.string(), // Client ephemeral public (A)
});

const loginResponseSchema = z.object({
  email: z.string().email(),
  clientProof: z.string(), // Client proof (M)
  clientEphemeral: z.string(), // Client ephemeral public (A)
});

router.post("/login/challenge", async (req, res, next) => {
  try {
    // Validate request body with zod
    const parsed = loginChallengeSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((error) => error.message).join(", "));
    }

    const { email, clientEphemeral } = parsed.data;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const user = await db.collection("users").findOne({ email });

    // Check to see if user exists
    if (!user) {
      // TODO create bogus salt & verifier and send back to client
      throw new NotFoundError("User");
    }

    const { secret, public: serverEphemeral } = generateEphemeral(user.verifier);

    // Store user session
    await db.collection("user-sessions").insertOne({
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

router.post("/login/response", async (req, res, next) => {
  try {
    const parsed = loginResponseSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((error) => error.message).join(", "));
    }

    const { email, clientProof, clientEphemeral } = parsed.data;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const userSession = await db.collection("user-sessions").findOne({ email, clientEphemeral });
    if (!userSession) {
      throw new ForbiddenError("Invalid SRP challenge");
    }

    const user = await db.collection("users").findOne({ email });
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
router.post("/login/checkpoint", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // check if token 2fa is already verified and return master salt if so
  // validate user has 2fa enabled
  // verify if code is correct
  // create new token with 2fa enabled

  // set cookie header for token
  res.status(200);
});

export default router;
