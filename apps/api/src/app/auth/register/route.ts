import { NextRequest } from "next/server";

interface IncomingBodyRequest {
  firstName: string;
  lastName: string;
  email: string;
  credentials: IncomingBodyCredentialsRequest[];
  kms: IncomingBodyKMSRequest;
  keychain: IncomingBodyKeychainRequest;
}

interface IncomingBodyCredentialsRequest {
  [key: string]: string;
}

interface IncomingBodyKMSRequest {
  salt: string;
  recovery: string;
  keychain: string;
}

interface IncomingBodyKeychainRequest {
  signature: IncomingBodyKeychainObject;
  sharing: IncomingBodyKeychainObject;
}

interface IncomingBodyKeychainObject {
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
