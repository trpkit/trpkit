import { z } from "zod";

export const noProtoString = z
  .string()
  .min(1)
  .refine((s) => !s.includes("__proto__"), { message: "String must not include '__proto__'" });
