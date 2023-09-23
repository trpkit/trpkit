import { base64url, utf8 } from "@scure/base";
import { NextRequest, NextResponse } from "next/server";

import { ZLaunch } from "@trpkit/common";
import { mongo } from "@trpkit/storage";

// Specifying a version in this route is not necessary since its temporary and will be removed at launch
export async function POST(request: NextRequest) {
  // Error response from no email address
  if (!request.nextUrl.searchParams.has("email")) {
    return NextResponse.json(
      {
        message: "Missing email address.",
      },
      {
        status: 400,
      }
    );
  }

  // Get email address from search parameter and decode it from base64url (e.g. ?email=am9obi5kb2VAZXhhbXBsZS5jb20= -> john.doe@example.com)
  const email = utf8.encode(base64url.decode(request.nextUrl.searchParams.get("email")));

  const validatedEmail = ZLaunch.safeParse(email);

  if (!validatedEmail.success) {
    return NextResponse.json(
      {
        message: "Invalid email address.",
      },
      {
        status: 400,
      }
    );
  }

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // Submitting the same email more than once will only change the submittedAt field, no need to return an error message if already subscribed.
  await db
    .collection("launch")
    .updateOne(
      { email: email },
      { $set: { email: email, submittedAt: Date.now() } },
      { upsert: true }
    );

  // Return a created status code
  return new Response(null, {
    status: 201,
  });
}
