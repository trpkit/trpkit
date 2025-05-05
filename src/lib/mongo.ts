import { MongoClient } from "mongodb";

let _mongo: MongoClient;

export default async function mongo(): Promise<MongoClient> {
  if (!_mongo) {
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing required environment variable: MONGODB_URI");
    }

    _mongo = new MongoClient(process.env.MONGODB_URI, { appName: "Trpkit" });
    await _mongo.connect();
  }

  return _mongo;
}
