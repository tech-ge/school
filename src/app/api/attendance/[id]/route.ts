import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Attendance } from '@/lib/db/models/Attendance';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const record = await Attendance.findById(params.id).lean();
  if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(record);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const record = await Attendance.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(record);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Attendance.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}