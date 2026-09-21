import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

export async function getCurrentUser() {
  const token = cookies().get('techgeo_token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}