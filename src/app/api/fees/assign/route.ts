import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Fee } from '@/lib/db/models/Fee';

export async function POST(req: Request) {
  await connectDB();
  const { feeId, studentIds } = await req.json();
  const updates = await Promise.all(
    studentIds.map((sid: string) => Fee.findByIdAndUpdate(feeId, { studentId: sid }, { new: true }))
  );
  return NextResponse.json(updates);
}