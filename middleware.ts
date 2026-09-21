import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

const PROTECTED = ['/admin', '/teacher', '/student', '/parent'];
const ROLE_MAP: Record<string, string> = {
  '/admin': 'ADMIN',
  '/teacher': 'TEACHER',
  '/student': 'STUDENT',
  '/parent': 'PARENT',
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('techgeo_token')?.value;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  for (const [path, role] of Object.entries(ROLE_MAP)) {
    if (pathname.startsWith(path) && payload.role !== role) {
      return NextResponse.redirect(new URL(`/${payload.role.toLowerCase()}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/teacher/:path*', '/student/:path*', '/parent/:path*'],
};