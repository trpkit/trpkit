import { base64url, utf8 } from "@scure/base";
import { NextRequest, NextResponse } from "next/server";

import { mongo } from "@trpkit/storage";

// Specifying a version in this route is not necessary since its temporary and will be removed at launch
export async function POST(request: NextRequest) {
  // Get email address from search parameter and decode it from base64url (e.g. ?email=am9obi5kb2VAZXhhbXBsZS5jb20= -> john.doe@example.com)
  const email = utf8.encode(base64url.decode(request.nextUrl.searchParams.get("email")));

  // Error response from no email address
  if (!email) {
    return NextResponse.json(
      {
        message: "Missing email address from request.",
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
  return NextResponse.next({ status: 201 });
}
