import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Teacher } from '@/lib/db/models/Teacher';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const teacher = await Teacher.findById(params.id).lean();
  if (!teacher) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(teacher);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const teacher = await Teacher.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(teacher);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Teacher.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}