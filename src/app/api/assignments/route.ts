import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Assignment } from '@/lib/db/models/Assignment';

export async function GET() {
  await connectDB();
  return NextResponse.json(await Assignment.find().sort({ createdAt: -1 }).lean());
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Assignment.create(body), { status: 201 });
}