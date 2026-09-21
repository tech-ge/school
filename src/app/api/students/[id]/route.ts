import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Student } from '@/lib/db/models/Student';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const student = await Student.findById(params.id).lean();
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(student);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const student = await Student.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(student);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Student.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}