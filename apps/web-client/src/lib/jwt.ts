import { JWTVerifyResult, jwtVerify } from "jose";

export async function verify(token: string): Promise<JWTVerifyResult> {
  return await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
    algorithms: ["HS256"],
    issuer: "urn:trpkit:api.trpkit.com",
    audience: "urn:trpkit:app.trpkit.com",
  });
}
