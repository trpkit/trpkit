import { env } from "@/env";
import { ConflictError, ValidationError } from "@/errors";
import { signToken } from "@/lib/jwt";
import { mongo } from "@/lib/mongo";
import { Router } from "express";
import { z } from "zod";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  verifier: z.string().length(344, "Invalid SRP verifier length"),
  salt: z.string().length(44, "Invalid SRP salt length"),
});

router.post("/register", async (req, res, next) => {
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
    const emailExists = (await db.collection("users").countDocuments({ email })) > 0;
    if (emailExists) {
      throw new ConflictError("Email already registered.");
    }

    const createdAt = new Date();

    // Store user record
    const result = await db.collection("users").insertOne({
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

export default router;
