import { z } from 'zod';

export const CreateStudentSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  matricNo: z.string().min(3, 'Matric number required'),
  department: z.string().min(2, 'Department required'),
  level: z.enum(['100', '200', '300', '400', '500']).default('100'),
  parentId: z.string().optional(),
});

export const UpdateStudentSchema = CreateStudentSchema.partial();

export const GradeSchema = z.object({
  studentId: z.string(),
  subject: z.string(),
  score: z.number().min(0).max(100),
  term: z.string(),
});

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>;
export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;
