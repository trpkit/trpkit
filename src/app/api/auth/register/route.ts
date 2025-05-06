import mongo from "@/lib/mongo";
import { RegisterOpCode, registerSchema } from "@/lib/types/auth";
import * as opaque from "@serenity-kit/opaque";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const rawBody = await req.json();
  const parsedBody = registerSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    // TODO Likely want to return the errors from zod
    return new NextResponse("Invalid payload", { status: 400 });
  }

  const body = parsedBody.data;

  const client = await mongo();
  const db = client.db();

  switch (body.op) {
    case RegisterOpCode.RegisterStart: {
      // This step performs the server-side cryptographic handshake for OPAQUE registration
      // Do not perform identity validation here to avoid leaking information, validation will
      // be performed in the next operation (RegisterFinish).
      const { registrationResponse } = opaque.server.createRegistrationResponse({
        serverSetup: process.env.OPAQUE_SERVER_KEY,
        userIdentifier: body.d.identifier,
        registrationRequest: body.d.request,
      });

      return NextResponse.json({ res: registrationResponse });
    }
    case RegisterOpCode.RegisterFinish: {
      const user = await db.collection("users").findOne({ email: body.d.identifier });

      if (!user) {
        // We're only creating a user if they don't exist.
        await db.collection("users").insertOne({
          email: body.d.identifier,
          registrationRecord: body.d.request,
          // TODO likely wanna add other fields here
          createdAt: new Date(),
          updatedAt: null,
        });
      }

      // Always return 200 to prevent leaking users data
      return new NextResponse(null, { status: 200 });
    }
    default: {
      // This code should be unreachable
      // If new OpCodes are added without implementation, this will return a 400 error
      return new NextResponse("Invalid operation", { status: 400 });
    }
  }
}
