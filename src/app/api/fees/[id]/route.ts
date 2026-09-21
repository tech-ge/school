import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Fee } from '@/lib/db/models/Fee';
import { getParentStudentIds, getStudentForUser, requireUser, responseForAccess } from '@/lib/auth/access';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const access = await requireUser();
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const fee = await Fee.findById(params.id).populate('studentId').lean() as any;
  if (!fee) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const studentId = String((fee.studentId as any)?._id || fee.studentId);
  const ownStudent = await getStudentForUser(access.user.userId) as any;
  if (access.user.role === 'STUDENT' && studentId !== String(ownStudent?._id)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  if (access.user.role === 'PARENT' && !(await getParentStudentIds(access.user.userId)).includes(studentId)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json(fee);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const access = await requireUser(['ADMIN']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const body = await req.json();
  const fee = await Fee.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(fee);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const access = await requireUser(['ADMIN']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  await Fee.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}