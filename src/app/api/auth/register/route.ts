import mongo from "@/lib/mongo";
import * as opaque from "@serenity-kit/opaque";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Move to a separate file
enum OpCode {
  RegisterStart = 0,
  RegisterFinish = 1,
}

// Move to a separate file
const noProtoString = z
  .string()
  .min(1)
  .refine((s) => !s.includes("__proto__"), { message: "String must not include '__proto__'" });

// Likely move two schemas below to a separate file
const registerRequest = z.object({
  identifier: noProtoString,
  request: noProtoString,
});

const registerSchema = z.discriminatedUnion("op", [
  z.object({
    op: z.literal(OpCode.RegisterStart),
    d: registerRequest,
  }),
  z.object({
    op: z.literal(OpCode.RegisterFinish),
    d: registerRequest,
  }),
]);

export async function POST(req: NextRequest) {
  const rawBody = await req.json();
  const parsedBody = registerSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    // Likely want to return the errors from zod
    return new NextResponse("Invalid payload", { status: 400 });
  }

  const body = parsedBody.data;

  const client = await mongo();
  const db = client.db();

  switch (body.op) {
    case OpCode.RegisterStart: {
      // TODO check if identifier is already taken
      //  return 400 error if it is

      const { registrationResponse } = opaque.server.createRegistrationResponse({
        serverSetup: process.env.OPAQUE_SERVER_KEY,
        userIdentifier: body.d.identifier,
        registrationRequest: body.d.request,
      });

      return NextResponse.json({ res: registrationResponse });
    }
    case OpCode.RegisterFinish: {
      // TODO check if identifier is already taken
      //  return 200 even if taken to prevent leaking information

      return NextResponse.json({});
    }
    default: {
      // This code should be unreachable
      // If new OpCodes are added without implementation, this will return a 400 error
      return new NextResponse("Invalid operation", { status: 400 });
    }
  }
}
