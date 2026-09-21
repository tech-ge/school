import { getCurrentUser } from './session';
import { Parent } from '@/lib/db/models/Parent';
import { Student } from '@/lib/db/models/Student';
import { Teacher } from '@/lib/db/models/Teacher';

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
export type CurrentUser = {
  userId: string;
  role: Role;
  email: string;
  name: string;
};

export async function requireUser(roles?: Role[]) {
  const user = await getCurrentUser();
  if (!user) return { error: 'Unauthorized', status: 401 as const };
  if (roles && !roles.includes(user.role as Role)) {
    return { error: 'Forbidden', status: 403 as const };
  }
  return { user: user as CurrentUser };
}

export async function getStudentForUser(userId: string) {
  return Student.findOne({ userId }).lean();
}

export async function getTeacherForUser(userId: string) {
  return Teacher.findOne({ userId }).lean();
}

export async function getParentStudentIds(userId: string) {
  const parent = await Parent.findOne({ userId }).select('children').lean() as any;
  const children = parent?.children?.map(String) || [];
  const linkedChildren = await Student.find({ parentId: userId }).distinct('_id');
  return [...new Set([...children, ...linkedChildren.map(String)])];
}

export function responseForAccess(result: { error?: string; status?: 401 | 403 }) {
  return Response.json(
    { error: result.error || 'Unauthorized' },
    { status: result.status || 401 },
  );
}
