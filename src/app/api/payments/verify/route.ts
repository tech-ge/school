import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Payment } from '@/lib/db/models/Payment';
import { Fee } from '@/lib/db/models/Fee';
import { verifyPayment } from '@/lib/paystack/verify';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');
    if (!reference) return NextResponse.json({ error: 'Missing reference' }, { status: 400 });

    const result: any = await verifyPayment(reference);
    if (!result.status) return NextResponse.json({ error: 'Verification failed' }, { status: 400 });

    const { status, amount, metadata } = result.data;

    await Payment.findOneAndUpdate(
      { reference },
      { status, amount, paystackData: result.data, paidAt: new Date() },
      { upsert: true, new: true }
    );

    if (status === 'success' && metadata?.feeId) {
      await Fee.findByIdAndUpdate(metadata.feeId, { status: 'PAID' });
    }

    return NextResponse.json({ status, data: result.data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}