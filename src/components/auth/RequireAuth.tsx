"use server";

import mongo from "@/lib/mongo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function RequireAuth({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(process.env.NEXT_PUBLIC_SESSION_COOKIE);

  if (!sessionCookie) {
    redirect("/auth/login");
  }

  const client = await mongo();
  const db = client.db();
  const session = await db.collection("userSessions").findOne({ sessionId: sessionCookie.value });

  if (!session) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
