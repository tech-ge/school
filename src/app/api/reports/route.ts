import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Student } from '@/lib/db/models/Student';
import { Teacher } from '@/lib/db/models/Teacher';
import { Payment } from '@/lib/db/models/Payment';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  const [students, teachers, payments] = await Promise.all([
    Student.countDocuments(), Teacher.countDocuments(),
    Payment.aggregate([{ $match: { status: 'success' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
  ]);
  return NextResponse.json({
    students, teachers,
    revenue: payments[0]?.total || 0,
  });
}