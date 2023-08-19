import { NextRequest, NextResponse } from "next/server";
import { generateEphemeral } from "secure-remote-password/server";

import { mongo } from "@trpkit/storage";

// TODO: Probably should look into using zod for types
interface IncomingBodyRequest {
  email: string;
  clientEphemeral: string;
}

export async function POST(request: NextRequest) {
  // Client -----> Server
  // username (email) and clientEphemeral.public
  const body = (await request.json()) as IncomingBodyRequest;

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // Validate incoming email
  const emailExist = await db.collection("users").countDocuments({ email: body.email });

  if (emailExist === 0) {
    // TODO: User doesn't exist, send bogus salt & ephemeral back
    // For now, we just going to send an error message
    return NextResponse.json(
      {
        message: "No account was found with that email.",
      },
      {
        status: 400,
      }
    );
  }

  // Grab user document
  const user = await db.collection("users").findOne({ email: body.email });

  // Find srp credentials
  // TODO: Probably do some validation that this actually exists
  const srpCredentials = user.credentials.find((c: any) => c.type === "srp");

  // Generate server ephemeral
  const serverEphemeral = generateEphemeral(body.clientEphemeral);

  // Store server ephemeral secret in database for later use
  // This collection has an TTL index to automatically delete sessions after 7d
  await db.collection("user_sessions").insertOne({
    email: body.email,
    ephemeral: {
      secret: serverEphemeral.secret,
      public: serverEphemeral.public,
    },
    createdAt: new Date(),
    updatedAt: null,
  });

  // Client <----- Server
  // salt and serverEphemeral.public

  // Send response back to client
  return NextResponse.json(
    {
      d: {
        ephemeral: serverEphemeral.public,
        // Note: this is the SRP salt, not the KMS salt
        salt: srpCredentials.salt,
      },
    },
    {
      status: 200,
    }
  );
}
