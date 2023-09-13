import { NextRequest, NextResponse } from "next/server";

import { sign } from "@trpkit/common";
import { mongo } from "@trpkit/storage";

// TODO: Probably should look into using zod for types
interface IncomingBodyRequest {
  firstName: string;
  lastName: string;
  email: string;
  credentials: IncomingBodyCredentialsRequest[];
  kms: IncomingBodyKMSRequest;
  keychain: IncomingBodyKeychainRequest;
}

interface IncomingBodyCredentialsRequest {
  type: CredentialsType;
  preferred?: boolean;
  [key: string]: unknown;
}

type CredentialsType = "srp" | "2fa-authenticator" | "2fa-passkey";

interface IncomingBodyKMSRequest {
  salt: string;
  recovery: string;
  keychain: string;
}

interface IncomingBodyKeychainRequest {
  signature: KeychainObject;
  sharing: KeychainObject;
}

interface KeychainObject {
  secret: string;
  public: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as IncomingBodyRequest;

  // TODO: Validate all necessary fields exist (400 bad request)
  // We're not worried about the first and last name at the moment. The onboarding flow beta will be slightly different from our first release.

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // Validate email address (400 bad request)
  const emailExist = await db.collection("users").countDocuments({ email: body.email });

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

  // Insert into database
  // TODO: Once we switch to zod, we can use safeParse to ensure the correct fields are being inserted. This will happen before beta launch.
  await db.collection("users").insertOne({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    credentials: [...body.credentials],
    kms: {
      salt: body.kms.salt,
      recovery: body.kms.recovery,
      keychain: body.kms.keychain,
    },
    keychain: {
      signature: body.keychain.signature,
      sharing: body.keychain.sharing,
    },
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
