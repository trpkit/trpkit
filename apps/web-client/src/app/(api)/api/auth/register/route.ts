import { NextRequest, NextResponse } from "next/server";

import { ZAuthRegistration, sign } from "@trpkit/common";
import { mongo } from "@trpkit/storage";

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SIGNUP_ENABLED !== "true") {
    return NextResponse.json(
      {
        message: "Registration is currently disabled.",
      },
      {
        status: 403,
      }
    );
  }

  const body = await request.json();

  // Validate incoming request
  const validatedBody = ZAuthRegistration.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      {
        message: "Invalid registration form.",
      },
      {
        status: 400,
      }
    );
  }

  const data = validatedBody.data;

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // Validate email address (400 bad request)
  const emailExist = await db.collection("users").countDocuments({ email: data.email });

  if (emailExist > 0) {
    // Email exists
    return NextResponse.json(
      {
        // TODO: Probably should change this error message
        //  Look into other privacy-focused applications to see what the messaging is like. Ideally, we shouldn't let someone know that an account already exists.
        message: "Email already in use.",
      },
      {
        status: 400,
      }
    );
  }

  await db.collection("users").insertOne({
    email: data.email,
    srp: data.srp,
    kms: data.kms,
    keychain: data.keychain,
    createdAt: new Date(),
    updatedAt: null,
  });

  // TODO: Send welcome email
  //  We could probably personalize this and use Nick or Tyler's email to send it from instead of a generic noreply or support address.

  // Create JWT token and send back to user
  // You will automatically be logged in after registration instead of having to go and sign in after registration. Let's provide a seamless flow.
  const token = await sign({
    email: body.email,
  });

  return NextResponse.json(
    {
      token: token,
    },
    {
      status: 200,
    }
  );
}
