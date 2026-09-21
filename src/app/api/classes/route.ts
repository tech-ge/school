import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Class } from '@/lib/db/models/Class';

export async function GET() {
  await connectDB();
  return NextResponse.json(await Class.find().populate('teacherId').lean());
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Class.create(body), { status: 201 });
}