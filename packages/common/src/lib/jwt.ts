import { utf8 } from "@scure/base";
import { JWTPayload, SignJWT } from "jose";

export async function sign(payload: JWTPayload): Promise<string> {
  return (
    new SignJWT(payload)
      // TODO: Consider switching to RS256, we will decide this before market release
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setIssuer("urn:trpkit:api.trpkit.com")
      .setAudience("urn:trpkit:app.trpkit.com")
      .setExpirationTime("7d")
      // TODO: We'll probably create a CLI to generate secrets through our KMS during an initialization script for dev environments
      .sign(utf8.decode(process.env.JWT_SECRET!))
  );
}
