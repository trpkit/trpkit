import { NextRequest, NextResponse } from "next/server";
import { deriveSession } from "secure-remote-password/server";

import { mongo } from "@trpkit/storage";

// TODO: Probably should look into using zod for types
interface IncomingBodyRequest {
  email: string;
  clientSession: string;
}

export async function POST(request: NextRequest) {
  // Client -----> Server
  // clientSession.proof
  const body = (await request.json()) as IncomingBodyRequest;

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // Validate incoming email
  const emailExist = await db.collection("users").countDocuments({ email: body.email });

  if (emailExist === 0) {
    return NextResponse.json(
      {
        // TODO: Create a better response
        message: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }

  // Grab user document
  // TODO: Create a type for this document (preferably with zod)
  const user = await db.collection("users").findOne({ email: body.email });

  // Find srp credentials
  // TODO: Probably do some validation that this actually exists
  const srpCredentials = user.credentials.find((c: any) => c.type === "srp");

  // Grab user session document
  // TODO: Create a type for this document (preferably with zod)
  const userSession = await db.collection("user_sessions").findOne({
    email: body.email,
    client: { session: null },
    server: { session: { key: null, proof: null } },
    updatedAt: null,
  });

  // Validate the proof and derive session
  const serverSession = deriveSession(
    userSession.server.ephemeral.secret,
    userSession.client.epheremal,
    srpCredentials.salt,
    body.email,
    srpCredentials.verifier,
    body.clientSession
  );

  // Store server session secret and public in database for later use
  // This collection has an TTL index to automatically delete sessions after 7d
  await db.collection("user_sessions").updateOne(
    {
      _id: userSession._id,
    },
    {
      $set: {
        client: {
          session: body.clientSession,
        },
        server: {
          session: {
            key: serverSession.key,
            proof: serverSession.proof,
          },
        },
        updatedAt: new Date(),
      },
    }
  );

  // Client <----- Server
  // serverSession.proof

  // Send response back to server
  // TODO: Determine if 2FA is enabled on the account.
  //  No 2FA -> Send KMS salt, KMS keychain and keychain in response
  //  2FA    -> Require client to submit 2FA code or passkey, then send KMS salt, KMS keychain and keychain if successful
  return NextResponse.json(
    {
      d: {
        proof: serverSession.proof,
      },
    },
    {
      status: 200,
    }
  );
}
