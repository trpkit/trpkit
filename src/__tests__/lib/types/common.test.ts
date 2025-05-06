import { noProtoString } from "@/lib/types/common";
import { describe, expect, it } from "vitest";

describe("noProtoString schema", () => {
  it("validates a normal string", () => {
    const result = noProtoString.safeParse("hello");
    expect(result.success).toBe(true);
  });

  it("rejects empty string", () => {
    const result = noProtoString.safeParse("");
    expect(result.success).toBe(false);
  });

  it("rejects string containing __proto__", () => {
    const result = noProtoString.safeParse("__proto__");
    expect(result.success).toBe(false);
  });
});
