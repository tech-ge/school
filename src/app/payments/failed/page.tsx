import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass p-12 rounded-3xl text-center max-w-md">
        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
        <h1 className="font-display text-3xl mb-2">Payment Failed</h1>
        <p className="text-muted mb-8">Your transaction was not completed.</p>
        <Link href="/student/fees" className="btn-gold inline-block">Try Again</Link>
      </div>
    </main>
  );
}