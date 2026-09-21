'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Mail, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    toast.success('Reset link sent to your email');
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="glass p-10 rounded-3xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6 text-gold" />
        </div>
        <h1 className="font-display text-2xl mb-2">Check Your Inbox</h1>
        <p className="text-muted text-sm mb-8">
          We've sent a password reset link to <span className="text-gold">{email}</span>
        </p>
        <Link href="/login" className="btn-gold inline-block">Back to Login</Link>
      </div>
    );
  }

  return (
    <div className="glass p-10 rounded-3xl">
      <h1 className="font-display text-3xl mb-2">Reset Password</h1>
      <p className="text-sm text-muted mb-8">
        Enter your email and we'll send you a reset link.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs uppercase tracking-widest text-muted mb-2 block">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email" required
              className="input-field pl-11"
              placeholder="you@techgeo.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>
      <p className="text-sm text-center text-muted mt-8">
        Remembered it? <Link href="/login" className="gold-text font-semibold">Sign in</Link>
      </p>
    </div>
  );
}