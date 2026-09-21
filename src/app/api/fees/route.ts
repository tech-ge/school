import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Fee } from '@/lib/db/models/Fee';

export async function GET() {
  await connectDB();
  return NextResponse.json(await Fee.find().sort({ createdAt: -1 }).lean());
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Fee.create(body), { status: 201 });
}