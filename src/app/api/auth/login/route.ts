import mongo from "@/lib/mongo";
import * as opaque from "@serenity-kit/opaque";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Move to a separate file
enum OpCode {
  LoginStart = 0,
  LoginFinish = 1,
  // TODO 2fa op codes
}

// TODO duplicate code, thus can be removed and shared between the register and login (and others in future)
// Move to a separate file
const noProtoString = z
  .string()
  .min(1)
  .refine((s) => !s.includes("__proto__"), { message: "String must not include '__proto__'" });

// Likely move two schemas below to a separate file
const loginRequest = z.object({
  identifier: noProtoString,
  request: noProtoString,
});

const loginSchema = z.discriminatedUnion("op", [
  z.object({
    op: z.literal(OpCode.LoginStart),
    d: loginRequest,
  }),
  z.object({
    op: z.literal(OpCode.LoginFinish),
    d: loginRequest,
  }),
]);

export async function POST(req: NextRequest) {
  const rawBody = await req.json();
  const parsedBody = loginSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    // Likely want to return the errors from zod
    return new NextResponse("Invalid payload", { status: 400 });
  }

  const body = parsedBody.data;

  const client = await mongo.connect();
  const db = client.db();

  switch (body.op) {
    case OpCode.LoginStart: {
      // TODO check if user exists / registration record
      // temporary
      const registrationRecord = "";

      // TODO check if user started login process (likely wanna have a TTL on it)

      const { serverLoginState, loginResponse } = opaque.server.startLogin({
        serverSetup: process.env.OPAQUE_SERVER_KEY,
        userIdentifier: body.d.identifier,
        registrationRecord,
        startLoginRequest: body.d.request,
      });

      // TODO add login state to db

      return NextResponse.json({ res: loginResponse });
    }
    case OpCode.LoginFinish: {
      // TODO check if user exists
      // TODO check if user started login process
      // temporary
      const serverLoginState = "";

      const { sessionKey } = opaque.server.finishLogin({
        finishLoginRequest: body.d.request,
        serverLoginState,
      });

      // TODO generate session id
      // TODO store session id and key in db
      // TODO delete login state from db

      // TODO set session id to a cookie

      return NextResponse.json({});
    }
    default: {
      // This code should be unreachable
      // If new OpCodes are added without implementation, this will return a 400 error
      return new NextResponse("Invalid operation", { status: 400 });
    }
  }
}
