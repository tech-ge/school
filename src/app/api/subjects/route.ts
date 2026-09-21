import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Subject } from '@/lib/db/models/Subject';

export async function GET() {
  await connectDB();
  return NextResponse.json(await Subject.find().lean());
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Subject.create(body), { status: 201 });
}