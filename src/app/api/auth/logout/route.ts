import mongo from "@/lib/mongo";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieName = process.env.NEXT_PUBLIC_SESSION_COOKIE;
  const sessionCookie = req.cookies.get(cookieName);

  const response = new NextResponse(null, { status: 200 });

  if (sessionCookie) {
    const sessionId = sessionCookie.value;

    const client = await mongo();
    const db = client.db();

    await db.collection("userSessions").deleteOne({ sessionId });
  }

  response.cookies.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
