import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Payment } from '@/lib/db/models/Payment';
import { Fee } from '@/lib/db/models/Fee';
import { verifyWebhookSignature } from '@/lib/paystack/webhook';

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-paystack-signature') || '';

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === 'charge.success') {
    await connectDB();
    const { reference, amount, metadata } = event.data;

    // Idempotent update
    const existing = await Payment.findOne({ reference });
    if (existing && existing.status === 'success') {
      return NextResponse.json({ ok: true, note: 'already processed' });
    }

    await Payment.findOneAndUpdate(
      { reference },
      { reference, status: 'success', amount, paystackData: event.data, paidAt: new Date(), feeId: metadata?.feeId, studentId: metadata?.studentId },
      { upsert: true, new: true }
    );

    if (metadata?.feeId) {
      await Fee.findByIdAndUpdate(metadata.feeId, { status: 'PAID' });
    }
  }

  return NextResponse.json({ ok: true });
}