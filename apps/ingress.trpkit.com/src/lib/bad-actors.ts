import { mongo } from "@trpkit/storage";

let badActors: Set<string> = new Set<string>();

// Maybe move this to separate package to reduce boilerplate
type BadActor = {
  userAgent: string;
};

export async function loadBadActors() {
  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  const ba = await db.collection<BadActor>("badActors").find({}).toArray();
  badActors = new Set(ba.map((item) => item.userAgent));
}

export function isBadActor(userAgent: string): boolean {
  return badActors.has(userAgent);
}
