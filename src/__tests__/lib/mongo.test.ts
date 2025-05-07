import mongo from "@/lib/mongo";
import { MongoClient } from "mongodb";
import { type Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("mongodb", () => {
  return {
    MongoClient: vi.fn(),
  };
});

describe("mongo function", () => {
  const originalEnv = process.env;
  let mockConnect: Mock;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env = { ...originalEnv };

    mockConnect = vi.fn().mockResolvedValue(undefined);
    (MongoClient as unknown as Mock).mockImplementation(() => ({
      connect: mockConnect,
    }));
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("throws an error when MONGODB_URI is not defined", async () => {
    process.env.MONGODB_URI = undefined;

    await expect(mongo()).rejects.toThrow("Missing required environment variable: MONGODB_URI");
  });

  it("creates a MongoDB client with the correct URI", async () => {
    const testUri = "mongodb://testdb:27017";
    process.env.MONGODB_URI = testUri;

    await mongo();

    expect(MongoClient).toHaveBeenCalledWith(testUri, { appName: "Trpkit" });
  });
});
