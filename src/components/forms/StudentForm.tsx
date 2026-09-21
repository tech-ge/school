'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export function StudentForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', matricNo: '', department: 'Computer Science', level: '100',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Student created');
      setForm({ name: '', email: '', matricNo: '', department: 'Computer Science', level: '100' });
      onSuccess?.();
    } catch {
      toast.error('Failed to create student');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Matric Number" required value={form.matricNo} onChange={(e) => setForm({ ...form, matricNo: e.target.value })} />
      <Input label="Department" required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
      <Input label="Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
      <Button type="submit" loading={loading} className="w-full">Create Student</Button>
    </form>
  );
}