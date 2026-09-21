import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Fee } from '@/lib/db/models/Fee';
import { Payment } from '@/lib/db/models/Payment';
import { initializePayment } from '@/lib/paystack/initialize';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { feeId, email } = await req.json();

    const fee = await Fee.findById(feeId);
    if (!fee) return NextResponse.json({ error: 'Fee not found' }, { status: 404 });

    const reference = `TG_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const result: any = await initializePayment({
      email, amount: fee.amount, reference,
      metadata: { feeId, studentId: fee.studentId },
    });

    if (!result.status) return NextResponse.json({ error: result.message }, { status: 400 });

    await Payment.create({
      reference, feeId, studentId: fee.studentId,
      amount: fee.amount, email, status: 'pending',
    });

    return NextResponse.json({ authorization_url: result.data.authorization_url, reference });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}