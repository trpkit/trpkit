import { randomBytes } from "node:crypto";
import mongo from "@/lib/mongo";
import { LoginOpCode, loginSchema } from "@/lib/types/auth";
import * as opaque from "@serenity-kit/opaque";
import { type NextRequest, NextResponse } from "next/server";

function generateSessionId() {
  return randomBytes(24).toString("hex");
}

export async function POST(req: NextRequest) {
  const rawBody = await req.json();
  const parsedBody = loginSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    // TODO Likely want to return the errors from zod
    return new NextResponse("Invalid payload", { status: 400 });
  }

  const body = parsedBody.data;

  const client = await mongo();
  const db = client.db();

  switch (body.op) {
    case LoginOpCode.LoginStart: {
      const user = await db.collection("users").findOne({ email: body.d.identifier });
      const registrationRecord = user ? user.registrationRecord : null;

      const { serverLoginState, loginResponse } = opaque.server.startLogin({
        serverSetup: process.env.OPAQUE_SERVER_KEY,
        userIdentifier: body.d.identifier,
        registrationRecord,
        startLoginRequest: body.d.request,
      });

      // We store the serverLoginState for every login attempt, even if the user doesn't
      // exist, to prevent leaking user data
      const expiration = new Date(Date.now() + 60 * 1000); // 1 minute

      await db.collection("userLogins").insertOne({
        email: body.d.identifier,
        loginState: serverLoginState,
        createdAt: new Date(),
        // TTL index should be created on this field
        //  db.collection('userLogins').createIndex({ expiresAt: 1, { expireAfterSeconds: 0 }});
        expiresAt: expiration,
      });

      return NextResponse.json({ res: loginResponse });
    }
    case LoginOpCode.LoginFinish: {
      const userLogin = await db.collection("userLogins").findOne({ email: body.d.identifier });

      if (!userLogin) {
        return new NextResponse("Invalid email or password", { status: 400 });
      }

      let sessionKey: string;
      try {
        ({ sessionKey } = opaque.server.finishLogin({
          finishLoginRequest: body.d.request,
          serverLoginState: userLogin.loginState,
        }));
      } catch {
        return new NextResponse("Invalid email or password", { status: 400 });
      }

      const sessionId = generateSessionId();

      const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

      await db.collection("userSessions").insertOne({
        email: body.d.identifier,
        sessionId,
        sessionKey,
        createdAt: new Date(),
        // TTL index should be created on this field
        //  db.collection('userSessions').createIndex({ expiresAt: 1, { expireAfterSeconds: 0 }});
        expiresAt: expiration,
      });

      // Delete the login state to prevent replay attacks
      await db.collection("userLogins").deleteOne({ _id: userLogin._id });

      const response = new NextResponse(null, { status: 200 });
      response.cookies.set(process.env.NEXT_PUBLIC_SESSION_COOKIE, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60,
      });

      return response;
    }
    default: {
      // This code should be unreachable
      // If new OpCodes are added without implementation, this will return a 400 error
      return new NextResponse("Invalid operation", { status: 400 });
    }
  }
}
