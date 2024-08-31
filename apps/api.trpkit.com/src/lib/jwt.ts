import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { env } from "../env";

if (!env.jwtPrivateKey || !env.jwtPublicKey) {
  throw new Error("Missing JWT private or public key.");
}

export async function signToken(payload: JWTPayload, expiresIn = "7d"): Promise<string> {
  const privateKey = new TextEncoder().encode(env.jwtPrivateKey);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .setNotBefore("0s")
    .sign(privateKey);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const publicKey = new TextEncoder().encode(env.jwtPublicKey);

  const { payload, protectedHeader } = await jwtVerify(token, publicKey, {
    algorithms: ["RS256"],
  });

  if (protectedHeader.alg !== "RS256" || protectedHeader.typ !== "JWT") {
    throw new Error("JWT protected headers do not match");
  }

  return payload;
}
