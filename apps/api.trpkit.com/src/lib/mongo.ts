import { env } from "@/env";
import { MongoClient } from "mongodb";

let _mongo: MongoClient | null = null;

export async function mongo(): Promise<MongoClient> {
  if (!_mongo) {
    if (!env.MONGO_URI) {
      throw new Error("Missing mongo URI");
    }

    _mongo = new MongoClient(env.MONGO_URI, {});
    await _mongo.connect();
  }

  return _mongo;
}
