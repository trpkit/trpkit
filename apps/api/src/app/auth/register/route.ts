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

  // Handle registration

  return new Response(null, {
    status: 201,
  });
}
