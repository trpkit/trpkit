import { MongoClient } from "mongodb";

let _mongo: MongoClient | null = null;

export async function mongo(): Promise<MongoClient> {
  if (!_mongo) {
    if (!process.env.TRPKIT_MONGO_URI) {
      throw new Error("@trpkit/storage: Missing required environment variable TRPKIT_MONGO_URI");
    }

    _mongo = new MongoClient(process.env.TRPKIT_MONGO_URI, {});
    await _mongo.connect();
  }

  return _mongo;
}
