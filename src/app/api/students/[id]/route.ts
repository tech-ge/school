import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Student } from '@/lib/db/models/Student';
import { getParentStudentIds, requireUser, responseForAccess } from '@/lib/auth/access';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const access = await requireUser();
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  if (access.user.role === 'STUDENT') {
    const own = await Student.exists({ _id: params.id, userId: access.user.userId });
    if (!own) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  if (access.user.role === 'PARENT') {
    const children = await getParentStudentIds(access.user.userId);
    if (!children.includes(params.id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const student = await Student.findById(params.id).lean();
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(student);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const access = await requireUser(['ADMIN']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const body = await req.json();
  const student = await Student.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(student);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const access = await requireUser(['ADMIN']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  await Student.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}