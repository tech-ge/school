'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export default function AssignmentsPage() {
  const [form, setForm] = useState({ title: '', dueDate: '', description: '' });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { toast.success('Assignment posted'); setForm({ title: '', dueDate: '', description: '' }); }
    else toast.error('Failed to post');
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Assignments</h1>
        <p className="text-muted">Post new tasks for students</p>
      </div>

      <form onSubmit={submit} className="glass p-6 rounded-2xl space-y-4 max-w-2xl">
        <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input label="Due Date" type="date" required value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <div>
          <label className="text-xs uppercase tracking-widest text-muted mb-2 block">Description</label>
          <textarea
            required rows={5}
            className="input-field"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <Button type="submit">Post Assignment</Button>
      </form>
    </div>
  );
}