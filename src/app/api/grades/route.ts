import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Grade } from '@/lib/db/models/Grade';

export async function GET() {
  await connectDB();
  return NextResponse.json(await Grade.find().lean());
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  if (body.grades) {
    const entries = Object.entries(body.grades).map(([student, score]) => ({
      studentId: student, score, grade: scoreToGrade(Number(score)),
    }));
    return NextResponse.json(await Grade.insertMany(entries), { status: 201 });
  }
  return NextResponse.json(await Grade.create(body), { status: 201 });
}

function scoreToGrade(s: number) {
  if (s >= 70) return 'A'; if (s >= 60) return 'B'; if (s >= 50) return 'C'; if (s >= 40) return 'D'; return 'F';
}