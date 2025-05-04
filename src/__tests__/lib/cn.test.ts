import { cn } from "@/lib/cn";
import { describe, expect, it } from "vitest";

describe("cn utility function", () => {
  it("combines multiple string class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("text-red-500", "bg-green-500", "p-2")).toBe("text-red-500 bg-green-500 p-2");
  });

  it("handles conditional class names", () => {
    const isActive = true;
    expect(cn("base-class", isActive && "active-class", !isActive && "inactive-class")).toBe(
      "base-class active-class"
    );

    const condition = false;
    expect(cn("foo", condition && "bar")).toBe("foo");
  });

  it("handles array of class names", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
    expect(cn(["text-red-500", "p-2"], "bg-green-500")).toBe("text-red-500 p-2 bg-green-500");
  });

  it("handles object of class names", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
    expect(cn({ "text-red-500": true, "bg-green-500": false, "p-2": true })).toBe(
      "text-red-500 p-2"
    );
  });

  it("ignores null, undefined, and false values", () => {
    expect(cn("foo", null, undefined, false, "bar")).toBe("foo bar");
    expect(cn(null, undefined, false)).toBe("");
  });

  it("merges conflicting Tailwind classes", () => {
    expect(cn("text-red-500", "text-green-500")).toBe("text-green-500");
    expect(cn("p-2 bg-red-500", "p-4 text-white")).toBe("bg-red-500 p-4 text-white");
  });

  it("returns an empty string when no arguments are provided", () => {
    expect(cn()).toBe("");
  });
});
