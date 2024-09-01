import { readFileSync } from "node:fs";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),

  // Express
  EXPRESS_ALLOWED_ORIGINS: z.string().transform((val) => val.split(",")),
  EXPRESS_PORT: z.number().int().default(3500),

  // JWT
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),

  // Mongo
  MONGO_URI: z.string(),
  MONGO_DB: z.string(),

  // Cookies
  COOKIE_DOMAIN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    `Missing or invalid environment variable${parsed.error.errors.length > 1 ? "s" : ""}:
${parsed.error.errors.map((error) => `  ${error.path}: ${error.message}`).join("\n")}`
  );
  process.exit(1);
}

const jwtPrivateKey = parsed.data.JWT_PRIVATE_KEY
  ? readFileSync(parsed.data.JWT_PRIVATE_KEY, "utf8")
  : undefined;
const jwtPublicKey = parsed.data.JWT_PUBLIC_KEY
  ? readFileSync(parsed.data.JWT_PUBLIC_KEY, "utf8")
  : undefined;

const secretEnvs: Array<keyof typeof envSchema.shape> = [];

for (const secretEnv of secretEnvs) {
  delete process.env[secretEnv];
}

export const env = Object.freeze({
  ...parsed.data,
  jwtPrivateKey,
  jwtPublicKey,
});
