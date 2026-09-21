'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const reference = params.get('reference') || params.get('trxref');
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    if (!reference) return setStatus('failed');
    fetch(`/api/payments/verify?reference=${reference}`)
      .then((r) => r.json())
      .then((d) => setStatus(d.status === 'success' ? 'success' : 'failed'))
      .catch(() => setStatus('failed'));
  }, [reference]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass p-12 rounded-3xl text-center max-w-md w-full">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-gold mx-auto mb-6 animate-spin" />
            <h1 className="font-display text-3xl mb-2">Verifying Payment</h1>
            <p className="text-muted">Please wait…</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h1 className="font-display text-3xl mb-2">Payment Successful</h1>
            <p className="text-muted mb-8">Your fees have been settled. Reference: {reference}</p>
            <Link href="/student" className="btn-gold inline-block">Back to Dashboard</Link>
          </>
        )}
        {status === 'failed' && (
          <>
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h1 className="font-display text-3xl mb-2">Payment Failed</h1>
            <p className="text-muted mb-8">Something went wrong. Please try again.</p>
            <Link href="/student/fees" className="btn-gold inline-block">Retry Payment</Link>
          </>
        )}
      </div>
    </main>
  );
}