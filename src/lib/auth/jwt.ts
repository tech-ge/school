import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signToken(payload: { userId: string; role: string; email: string; name: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; role: string; email: string; name: string };
  } catch {
    return null;
  }
}