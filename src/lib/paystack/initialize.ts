import { paystackRequest } from './client';

export async function initializePayment(input: {
  email: string; amount: number; reference: string; metadata?: any;
}) {
  return paystackRequest('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      amount: input.amount, // kobo
      reference: input.reference,
      metadata: input.metadata,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payments/success`,
    }),
  });
}