import { NextRequest, NextResponse } from "next/server";

import { verify } from "./lib/jwt";

export const config = {
  matcher: ["/((?!login|register|_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  if (!request.cookies.has(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const token = request.cookies.get(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME);

  try {
    await verify(token.value);

    return NextResponse.next();
  } catch {
    request.cookies.clear();
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
