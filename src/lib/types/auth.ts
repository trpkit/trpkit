import { noProtoString } from "@/lib/types/common";
import { z } from "zod";

export enum RegisterOpCode {
  RegisterStart = 0,
  RegisterFinish = 1,
}

export enum LoginOpCode {
  LoginStart = 0,
  LoginFinish = 1,
  // TODO 2fa op codes
}

// All requests look the same currently
export const authRequest = z.object({
  identifier: z.string().email(),
  request: noProtoString,
});

export const registerSchema = z.discriminatedUnion("op", [
  z.object({
    op: z.literal(RegisterOpCode.RegisterStart),
    d: authRequest,
  }),
  z.object({
    op: z.literal(RegisterOpCode.RegisterFinish),
    d: authRequest,
  }),
]);

export const loginSchema = z.discriminatedUnion("op", [
  z.object({
    op: z.literal(LoginOpCode.LoginStart),
    d: authRequest,
  }),
  z.object({
    op: z.literal(LoginOpCode.LoginFinish),
    d: authRequest,
  }),
]);
