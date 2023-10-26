import { NextRequest, NextResponse } from "next/server";
import { generateEphemeral } from "secure-remote-password/server";

import { ZAuthChallenge } from "@trpkit/common";
import { mongo } from "@trpkit/storage";

export async function POST(request: NextRequest) {
  // Client -----> Server
  // username (email) and clientEphemeral.public
  const body = await request.json();

  // Validate incoming request
  const validatedBody = ZAuthChallenge.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      {
        message: "Invalid challenge form.",
      },
      {
        status: 400,
      }
    );
  }

  const data = validatedBody.data;

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // Validate incoming email
  const emailExist = await db.collection("users").countDocuments({ email: data.email });

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
  // TODO: Create a type for this document (preferably with zod)
  const user = await db.collection("users").findOne({ email: data.email });

  // Generate server ephemeral
  const serverEphemeral = generateEphemeral(user?.srp.verifier);

  // Store server ephemeral secret and public in database for later use
  // This collection has an TTL index to automatically delete sessions after 7d
  await db.collection("user_sessions").insertOne({
    email: data.email,
    client: {
      ephemeral: data.clientEphemeral,
      session: null,
    },
    server: {
      ephemeral: {
        secret: serverEphemeral.secret,
        public: serverEphemeral.public,
      },
      session: {
        key: null,
        proof: null,
      },
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
        salt: user?.srp.salt,
      },
    },
    {
      status: 200,
    }
  );
}
