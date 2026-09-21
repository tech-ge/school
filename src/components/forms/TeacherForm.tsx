'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export function TeacherForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', staffId: '', department: 'Computer Science', title: 'Lecturer',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Faculty added');
      onSuccess?.();
    } catch {
      toast.error('Failed to add faculty');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Staff ID" required value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} />
      <Input label="Department" required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
      <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <Button type="submit" loading={loading} className="w-full">Add Faculty</Button>
    </form>
  );
}