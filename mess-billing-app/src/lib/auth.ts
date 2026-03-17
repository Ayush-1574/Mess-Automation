import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "super-secret-key-please-change-in-production";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(payload: any) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const session = await encrypt(payload);

  (await cookies()).set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0), path: "/" });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

