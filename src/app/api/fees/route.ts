import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Fee } from '@/lib/db/models/Fee';
import { getParentStudentIds, getStudentForUser, requireUser, responseForAccess } from '@/lib/auth/access';

export async function GET() {
  const access = await requireUser();
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const filter = access.user.role === 'ADMIN'
    ? {}
    : access.user.role === 'STUDENT'
      ? { studentId: (await getStudentForUser(access.user.userId) as any)?._id }
      : access.user.role === 'PARENT'
        ? { studentId: { $in: await getParentStudentIds(access.user.userId) } }
        : { studentId: null };
  return NextResponse.json(await Fee.find(filter).sort({ createdAt: -1 }).lean());
}

export async function POST(req: Request) {
  const access = await requireUser(['ADMIN']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Fee.create(body), { status: 201 });
}