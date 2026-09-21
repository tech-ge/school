import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Subject } from '@/lib/db/models/Subject';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const subject = await Subject.findById(params.id).lean();
  if (!subject) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(subject);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const subject = await Subject.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(subject);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Subject.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}