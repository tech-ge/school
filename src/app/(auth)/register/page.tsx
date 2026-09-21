'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { User, Mail, Lock, Loader2, GraduationCap } from 'lucide-react';

const ROLES = [
  { value: 'STUDENT', label: 'Student', desc: 'Enroll in courses' },
  { value: 'TEACHER', label: 'Faculty', desc: 'Teach & grade' },
  { value: 'PARENT', label: 'Parent', desc: 'Track children' },
  { value: 'ADMIN', label: 'Admin', desc: 'Manage campus' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      toast.success('Welcome to TechGeo');
      router.push(`/${data.user.role.toLowerCase()}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass p-10 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-black" />
        </div>
        <div>
          <h1 className="font-display text-2xl">Join TechGeo</h1>
          <p className="text-xs text-muted">Begin your academic journey</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs uppercase tracking-widest text-muted mb-2 block">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input type="text" required className="input-field pl-11" placeholder="Jane Doe"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted mb-2 block">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input type="email" required className="input-field pl-11" placeholder="you@techgeo.edu"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted mb-2 block">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input type="password" required minLength={6} className="input-field pl-11" placeholder="••••••••"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted mb-2 block">I am a</label>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <button
                type="button" key={r.value}
                onClick={() => setForm({ ...form, role: r.value })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  form.role === r.value
                    ? 'border-gold/60 bg-gold/5'
                    : 'border-bg-border hover:border-white/20'
                }`}
              >
                <div className="font-semibold text-sm">{r.label}</div>
                <div className="text-xs text-muted">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Creating…' : 'Create Account'}
        </button>
      </form>

      <p className="text-sm text-center text-muted mt-8">
        Already enrolled?{' '}
        <Link href="/login" className="gold-text font-semibold">Sign in</Link>
      </p>
    </div>
  );
}