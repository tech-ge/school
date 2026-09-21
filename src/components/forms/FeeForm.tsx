'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export function FeeForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', term: '2026 Spring', amount: '', dueDate: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: Number(form.amount) * 100 }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Fee created');
      setForm({ name: '', term: '2026 Spring', amount: '', dueDate: '' });
      onSuccess?.();
    } catch {
      toast.error('Failed to create fee');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Fee Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Term" required value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} />
      <Input label="Amount (₦)" type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <Input label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
      <Button type="submit" loading={loading} className="w-full">Create Fee</Button>
    </form>
  );
}