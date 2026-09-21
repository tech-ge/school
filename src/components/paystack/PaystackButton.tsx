'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export function PaystackButton({
  feeId, email, label = 'Pay Now',
}: { feeId: string; email: string; label?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feeId, email }),
      });
      const data = await res.json();
      if (data.authorization_url) window.location.href = data.authorization_url;
      else toast.error(data.error || 'Init failed');
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleClick} loading={loading}>
      <CreditCard className="w-4 h-4" /> {label}
    </Button>
  );
}