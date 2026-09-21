import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Class } from '@/lib/db/models/Class';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const cls = await Class.findById(params.id).populate('teacherId students').lean();
  if (!cls) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(cls);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const cls = await Class.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(cls);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Class.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}