import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Grade } from '@/lib/db/models/Grade';
import { Class } from '@/lib/db/models/Class';
import { getParentStudentIds, getStudentForUser, getTeacherForUser, requireUser, responseForAccess } from '@/lib/auth/access';

export async function GET() {
  const access = await requireUser();
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  let filter: Record<string, unknown> = {};
  if (access.user.role === 'STUDENT') filter.studentId = (await getStudentForUser(access.user.userId) as any)?._id;
  if (access.user.role === 'PARENT') filter.studentId = { $in: await getParentStudentIds(access.user.userId) };
  if (access.user.role === 'TEACHER') {
    const teacher = await getTeacherForUser(access.user.userId) as any;
    const classes = await Class.find({ teacherId: teacher?._id }).select('_id').lean();
    filter.classId = { $in: classes.map((item: any) => item._id) };
  }
  return NextResponse.json(await Grade.find(filter).populate('studentId subjectId classId').lean());
}

export async function POST(req: Request) {
  const access = await requireUser(['ADMIN', 'TEACHER']);
  if ('error' in access) return responseForAccess(access);
  await connectDB();
  const body = await req.json();
  const entries = Array.isArray(body.entries) ? body.entries : [body];
  if (!entries.length || entries.some((entry: any) => !entry.classId || !entry.studentId || entry.score === undefined)) {
    return NextResponse.json({ error: 'classId, studentId and score are required' }, { status: 400 });
  }
  if (access.user.role === 'TEACHER') {
    const teacher = await getTeacherForUser(access.user.userId) as any;
    const allowed = await Class.findOne({ _id: entries[0].classId, teacherId: teacher?._id, students: { $all: entries.map((entry: any) => entry.studentId) } });
    if (!allowed || entries.some((entry: any) => String(entry.classId) !== String(entries[0].classId))) {
      return NextResponse.json({ error: 'You can only grade students in your assigned class' }, { status: 403 });
    }
  }
  const records = entries.map((entry: any) => ({ ...entry, grade: scoreToGrade(Number(entry.score)) }));
  return NextResponse.json(await Grade.insertMany(records), { status: 201 });
}

function scoreToGrade(s: number) {
  if (s >= 70) return 'A'; if (s >= 60) return 'B'; if (s >= 50) return 'C'; if (s >= 40) return 'D'; return 'F';
}