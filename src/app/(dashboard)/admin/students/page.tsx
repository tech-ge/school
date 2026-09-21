'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', matricNo: '', level: '100', department: '' });

  async function load() {
    setLoading(true);
    const res = await fetch('/api/students');
    setStudents(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success('Student added');
      setOpen(false);
      setForm({ name: '', email: '', matricNo: '', level: '100', department: '' });
      load();
    } else toast.error('Failed to add student');
  }

  const columns = [
    { key: 'matricNo', label: 'Matric No' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { key: 'level', label: 'Level', render: (r: any) => <Badge variant="gold">{r.level}</Badge> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl mb-2">Students</h1>
          <p className="text-muted">{students.length} enrolled scholars</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Add Student</Button>
      </div>

      {loading ? (
        <div className="glass p-12 text-center text-muted">Loading…</div>
      ) : (
        <DataTable columns={columns} data={students} />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add New Student">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Matric Number" required value={form.matricNo} onChange={(e) => setForm({ ...form, matricNo: e.target.value })} />
          <Input label="Department" required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          <Input label="Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
          <Button type="submit" className="w-full">Create Student</Button>
        </form>
      </Modal>
    </div>
  );
}