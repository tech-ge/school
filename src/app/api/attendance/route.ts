import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Attendance } from '@/lib/db/models/Attendance';

export async function GET() {
  await connectDB();
  return NextResponse.json(await Attendance.find().lean());
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Attendance.create(body), { status: 201 });
}