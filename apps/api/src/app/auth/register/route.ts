import { NextRequest } from "next/server";

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
  [key: string]: string;
}

type CredentialsType = "SRP";

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

  // TODO: Validate email address

  // TODO: Validate all necessary fields (credentials, kms, keychain)
  // We're not worried about the first and last name at the moment. The onboarding flow beta will be slightly different
  // from our first release.

  // TODO: Insert into database

  // TODO: Send welcome email

  // TODO: Create JWT token and send back to user
  // You will automatically be logged in after registration instead of having to go and sign in after registration. Lets
  // provide a seamless flow.

  return new Response(null, {
    status: 201,
  });
}
