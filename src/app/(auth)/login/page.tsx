'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      toast.success('Welcome back to TechGeo');
      router.push(`/${data.user.role.toLowerCase()}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass p-10 rounded-3xl">
      <h1 className="font-display text-3xl mb-2">Welcome Back</h1>
      <p className="text-sm text-muted mb-8">Sign in to your TechGeo portal</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs uppercase tracking-widest text-muted mb-2 block">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email" required
              className="input-field pl-11"
              placeholder="you@techgeo.edu"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted mb-2 block">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="password" required
              className="input-field pl-11"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="text-sm text-center text-muted mt-8">
        New to TechGeo?{' '}
        <Link href="/register" className="gold-text font-semibold">Create account</Link>
      </p>
    </div>
  );
}