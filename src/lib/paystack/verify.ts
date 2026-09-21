import { paystackRequest } from './client';

export async function verifyPayment(reference: string) {
  return paystackRequest(`/transaction/verify/${reference}`);
}