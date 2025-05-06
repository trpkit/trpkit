import { combine, split } from "shamir-secret-sharing";
import { describe, expect, it } from "vitest";

describe("Shamir Secret Sharing (n=2, k=2)", () => {
  // Ensure we're using Uint8Array
  const toUint8Array = (data: string) => {
    const encoded = new TextEncoder().encode(data);
    return new Uint8Array(encoded);
  };
  const fromUint8Array = (arr: Uint8Array) => new TextDecoder().decode(arr);

  const originalSecret = "supersecretmasterkey";
  const secretBytes = toUint8Array(originalSecret);

  it("splits into exactly 2 shares", async () => {
    const shares = await split(secretBytes, 2, 2);
    expect(shares.length).toBe(2);
  });

  it("reconstructs secret with both shares", async () => {
    const shares = await split(secretBytes, 2, 2);
    const reconstructed = await combine([shares[0], shares[1]]);
    expect(fromUint8Array(reconstructed)).toBe(originalSecret);
  });

  it("fails to reconstruct with only one share", async () => {
    const shares = await split(secretBytes, 2, 2);
    await expect(combine([shares[0]])).rejects.toThrow();
  });

  it("produces different shares on different split calls (randomized shares)", async () => {
    const shares1 = await split(secretBytes, 2, 2);
    const shares2 = await split(secretBytes, 2, 2);
    expect(shares1).not.toEqual(shares2);
  });

  it("supports round-trip base64 encode/decode for storage/transfer", async () => {
    const shares = await split(secretBytes, 2, 2);
    const encodedShares = shares.map((share) => btoa(String.fromCharCode(...share)));
    const decodedShares = encodedShares.map(
      (encoded) =>
        new Uint8Array(
          atob(encoded)
            .split("")
            .map((c) => c.charCodeAt(0))
        )
    );
    const reconstructed = await combine(decodedShares);
    expect(fromUint8Array(reconstructed)).toBe(originalSecret);
  });

  it("throws if invalid share provided during combine", async () => {
    const shares = await split(secretBytes, 2, 2);
    const invalidShare = toUint8Array("invalidshare");
    await expect(combine([shares[0], invalidShare])).rejects.toThrow();
  });
});
