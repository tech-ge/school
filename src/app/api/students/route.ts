import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Student } from '@/lib/db/models/Student';

export async function GET() {
  await connectDB();
  const students = await Student.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const student = await Student.create(body);
  return NextResponse.json(student, { status: 201 });
}