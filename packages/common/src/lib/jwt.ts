import { utf8 } from "@scure/base";
import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from "jose";

/**
 * Signs a JWT token
 *
 * @param payload The payload to sign
 */
export async function sign(payload: JWTPayload): Promise<string> {
  return (
    new SignJWT(payload)
      // TODO: Consider switching to RS256, we will decide this before market release
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setIssuer("urn:trpkit:app.trpkit.com")
      .setAudience("urn:trpkit:app.trpkit.com")
      .setExpirationTime("7d")
      // TODO: We'll probably create a CLI to generate secrets through our KMS during an initialization script for dev environments
      .sign(utf8.decode(process.env.JWT_SECRET!))
  );
}

/**
 * Verifies a JWT token
 *
 * @param token The JWT token to verify
 */
export async function verify(token: string): Promise<JWTVerifyResult> {
  return await jwtVerify(token, utf8.decode(process.env.JWT_SECRET!), {
    algorithms: ["HS256"],
    issuer: "urn:trpkit:app.trpkit.com",
    audience: "urn:trpkit:app.trpkit.com",
  });
}
