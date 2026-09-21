import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Enrollment } from '@/lib/db/models/Enrollment';
import { Subject } from '@/lib/db/models/Subject';
import { getStudentForUser, requireUser, responseForAccess } from '@/lib/auth/access';

export async function GET() {
  const access = await requireUser();
  if ('error' in access) return responseForAccess(access);
  await connectDB();

  const filter = access.user.role === 'ADMIN'
    ? {}
    : access.user.role === 'STUDENT'
      ? { studentId: (await getStudentForUser(access.user.userId) as any)?._id }
      : { studentId: null };

  return NextResponse.json(await Enrollment.find(filter).populate('subjectId').lean());
}

export async function POST(req: Request) {
  const access = await requireUser(['STUDENT']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();

  const student = await getStudentForUser(access.user.userId) as any;
  const { subjectId } = await req.json();
  if (!student || !subjectId) return NextResponse.json({ error: 'Student and course are required' }, { status: 400 });
  if (!(await Subject.exists({ _id: subjectId }))) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

  const enrollment = await Enrollment.findOneAndUpdate(
    { studentId: student._id, subjectId },
    { status: 'ENROLLED', enrolledAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  ).populate('subjectId').lean();
  return NextResponse.json(enrollment, { status: 201 });
}
