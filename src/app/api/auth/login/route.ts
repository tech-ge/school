import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/User';
import { comparePassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email }).select('+password');
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const ok = await comparePassword(password, user.password);
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = await signToken({ userId: user._id.toString(), role: user.role, email: user.email, name: user.name });

    const res = NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    res.cookies.set('techgeo_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/',
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}