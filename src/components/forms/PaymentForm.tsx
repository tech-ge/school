'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { CreditCard } from 'lucide-react';

export function PaymentForm({ feeId, email, amount }: { feeId: string; email: string; amount: number }) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feeId, email }),
      });
      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.error || 'Init failed');
      }
    } catch {
      toast.error('Payment error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted">Amount: <span className="gold-text font-semibold">₦{(amount / 100).toLocaleString()}</span></div>
      <Button onClick={handlePay} loading={loading} className="w-full">
        <CreditCard className="w-4 h-4" /> Pay with Paystack
      </Button>
    </div>
  );
}