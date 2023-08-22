import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!login|register|_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  // TODO: Handle middleware

  return NextResponse.redirect(new URL("/login", request.url));
}
