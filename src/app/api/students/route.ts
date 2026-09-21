import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Student } from '@/lib/db/models/Student';
import { getParentStudentIds, getStudentForUser, requireUser, responseForAccess } from '@/lib/auth/access';

export async function GET() {
  const access = await requireUser();
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  let students;
  if (access.user.role === 'ADMIN') {
    students = await Student.find().sort({ createdAt: -1 }).lean();
  } else if (access.user.role === 'STUDENT') {
    students = await Student.find({ userId: access.user.userId }).lean();
  } else if (access.user.role === 'PARENT') {
    students = await Student.find({ _id: { $in: await getParentStudentIds(access.user.userId) } }).lean();
  } else {
    return NextResponse.json({ error: 'Teachers must use their assigned classes' }, { status: 403 });
  }
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  const access = await requireUser(['ADMIN']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const body = await req.json();
  const student = await Student.create(body);
  return NextResponse.json(student, { status: 201 });
}