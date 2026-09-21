import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Fee } from '@/lib/db/models/Fee';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const fee = await Fee.findById(params.id).populate('studentId').lean();
  if (!fee) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(fee);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const fee = await Fee.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(fee);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Fee.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}