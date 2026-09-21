import { z } from 'zod';

export const InitializePaymentSchema = z.object({
  feeId: z.string().min(1, 'Fee ID required'),
  email: z.string().email('Invalid email'),
});

export const VerifyPaymentSchema = z.object({
  reference: z.string().min(1, 'Reference required'),
});

export const WebhookEventSchema = z.object({
  event: z.string(),
  data: z.object({
    reference: z.string(),
    amount: z.number(),
    status: z.string(),
    metadata: z.any().optional(),
  }),
});

export type InitializePaymentInput = z.infer<typeof InitializePaymentSchema>;
export type VerifyPaymentInput = z.infer<typeof VerifyPaymentSchema>;
