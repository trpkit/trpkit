import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),

  // Port
  PORT: z.number().default(3500),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    `Missing or invalid environment variable${parsed.error.errors.length > 1 ? "s" : ""}:
${parsed.error.errors.map((error) => `  ${error.path}: ${error.message}`).join("\n")}`
  );
  process.exit(1);
}

const secretEnvs: Array<keyof typeof envSchema.shape> = [];

for (const secretEnv of secretEnvs) {
  delete process.env[secretEnv];
}

export const env = Object.freeze(parsed.data);
