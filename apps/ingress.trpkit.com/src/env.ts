import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),

  // Mongo
  TRPKIT_MONGO_URI: z.string(),
  MONGO_DATABASE: z.string(),

  // Port
  PORT: z
    .string()
    .default("4000")
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => !Number.isNaN(val), { message: "Expected number" }),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    `Missing or invalid environment variable${parsed.error.errors.length > 1 ? "s" : ""}:
${parsed.error.errors.map((error) => `  ${error.path}: ${error.message}`).join("\n")}`
  );
  process.exit(1);
}

const secretEnvs: Array<keyof typeof envSchema.shape> = [
  // 'TRPKIT_MONGO_URI'
];

for (const secretEnv of secretEnvs) {
  delete process.env[secretEnv];
}

export const env = Object.freeze(parsed.data);
