import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Class } from '@/lib/db/models/Class';
import { getTeacherForUser, requireUser, responseForAccess } from '@/lib/auth/access';

export async function GET() {
  const access = await requireUser();
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const filter = access.user.role === 'ADMIN'
    ? {}
    : access.user.role === 'TEACHER'
      ? { teacherId: (await getTeacherForUser(access.user.userId) as any)?._id }
      : {};
  return NextResponse.json(await Class.find(filter).populate('teacherId subjectId').lean());
}

export async function POST(req: Request) {
  const access = await requireUser(['ADMIN']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Class.create(body), { status: 201 });
}