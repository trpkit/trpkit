import { SignJWT, jwtVerify } from "jose";
import { env } from "@/env";

if (!env.jwtPrivateKey || !env.jwtPublicKey) {
  throw new Error("Missing JWT private or public key.");
}

export async function signToken(userId: string, expiresIn = "7d"): Promise<string> {
  const privateKey = new TextEncoder().encode(env.jwtPrivateKey);

  return await new SignJWT()
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .setNotBefore("0s")
    .setSubject(userId)
    .sign(privateKey);
}

export async function verifyToken(token: string): Promise<string> {
  const publicKey = new TextEncoder().encode(env.jwtPublicKey);

  const { payload, protectedHeader } = await jwtVerify(token, publicKey, {
    algorithms: ["RS256"],
  });

  if (protectedHeader.alg !== "RS256" || protectedHeader.typ !== "JWT") {
    throw new Error("JWT protected headers do not match");
  }

  const userId = payload.sub;

  if (!userId) {
    throw new Error("JWT missing subject");
  }

  return userId;
}
