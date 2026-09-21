import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Grade } from '@/lib/db/models/Grade';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const grade = await Grade.findById(params.id).lean();
  if (!grade) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(grade);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const grade = await Grade.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(grade);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Grade.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}