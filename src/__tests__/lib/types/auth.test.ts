import {
  LoginOpCode,
  RegisterOpCode,
  authRequest,
  loginSchema,
  registerSchema,
} from "@/lib/types/auth";
import { describe, expect, it } from "vitest";

describe("authRequest schema", () => {
  it("validates correct data", () => {
    const result = authRequest.safeParse({
      identifier: "test@trpkit.com",
      request: "someRequestData",
    });
    expect(result.success).toBe(true);
  });

  it("invalidates missing identifier", () => {
    const result = authRequest.safeParse({
      request: "someRequestData",
    });
    expect(result.success).toBe(false);
  });

  it("invalidates invalid email", () => {
    const result = authRequest.safeParse({
      identifier: "invalid-email",
      request: "abc",
    });
    expect(result.success).toBe(false);
  });

  it("invalidates request containing __proto__", () => {
    const result = authRequest.safeParse({
      identifier: "test@example.com",
      request: "__proto__",
    });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema schema", () => {
  it("validates RegisterStart payload", () => {
    const result = registerSchema.safeParse({
      op: RegisterOpCode.RegisterStart,
      d: {
        identifier: "test@trpkit.com",
        request: "reqData",
      },
    });
    expect(result.success).toBe(true);
  });

  it("validates RegisterFinish payload", () => {
    const result = registerSchema.safeParse({
      op: RegisterOpCode.RegisterFinish,
      d: {
        identifier: "test@trpkit.com",
        request: "reqData",
      },
    });
    expect(result.success).toBe(true);
  });

  it("invalidates wrong op code", () => {
    const result = registerSchema.safeParse({
      op: 999,
      d: {
        identifier: "test@trpkit.com",
        request: "reqData",
      },
    });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema schema", () => {
  it("validates LoginStart payload", () => {
    const result = loginSchema.safeParse({
      op: LoginOpCode.LoginStart,
      d: {
        identifier: "test@trpkit.com",
        request: "reqData",
      },
    });
    expect(result.success).toBe(true);
  });

  it("validates LoginFinish payload", () => {
    const result = loginSchema.safeParse({
      op: LoginOpCode.LoginFinish,
      d: {
        identifier: "test@trpkit.com",
        request: "reqData",
      },
    });
    expect(result.success).toBe(true);
  });

  it("invalidates invalid op code", () => {
    const result = loginSchema.safeParse({
      op: -1,
      d: {
        identifier: "test@trpkit.com",
        request: "reqData",
      },
    });
    expect(result.success).toBe(false);
  });
});
