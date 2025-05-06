import { generateSessionId } from "@/lib/session";
import { describe, expect, it } from "vitest";

describe("generateSessionId function", () => {
  it("returns a string of 48 characters", () => {
    const id = generateSessionId();
    expect(typeof id).toBe("string");
    expect(id).toHaveLength(48);
  });

  it("generates unique values", () => {
    const ids = new Set(Array.from({ length: 10 }, generateSessionId));
    expect(ids.size).toBe(10);
  });
});
