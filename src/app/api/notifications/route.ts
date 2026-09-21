import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Notification } from '@/lib/db/models/Notification';
import { getCurrentUser } from '@/lib/auth/session';

export async function GET() {
  await connectDB();
  const user = await getCurrentUser();
  if (!user) return NextResponse.json([]);
  return NextResponse.json(await Notification.find({ userId: user.userId }).sort({ createdAt: -1 }).lean());
}