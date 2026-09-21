import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/User';
import { Student } from '@/lib/db/models/Student';
import { Teacher } from '@/lib/db/models/Teacher';
import { Parent } from '@/lib/db/models/Parent';
import { hashPassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    if (!['STUDENT', 'TEACHER', 'PARENT'].includes(role)) {
      return NextResponse.json({ error: 'Invalid registration role' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

    const user = await User.create({ name, email, password: await hashPassword(password), role });

    if (role === 'STUDENT') await Student.create({ userId: user._id, name, email, matricNo: `TG/${Date.now()}`, department: 'Undeclared', level: '100' });
    if (role === 'TEACHER') await Teacher.create({ userId: user._id, name, email, staffId: `TG/STF/${Date.now()}`, department: 'General' });
    if (role === 'PARENT') await Parent.create({ userId: user._id, name, email, children: [] });

    const token = await signToken({ userId: user._id.toString(), role: user.role, email: user.email, name: user.name });

    const res = NextResponse.json({ user: { id: user._id, name, email, role } });
    res.cookies.set('techgeo_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/',
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}