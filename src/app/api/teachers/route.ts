import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Teacher } from '@/lib/db/models/Teacher';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  return NextResponse.json(await Teacher.find().sort({ createdAt: -1 }).lean());
}