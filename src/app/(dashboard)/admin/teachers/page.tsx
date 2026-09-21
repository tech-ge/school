'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/teachers').then((r) => r.json()).then(setTeachers);
  }, []);

  const columns = [
    { key: 'staffId', label: 'Staff ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { key: 'title', label: 'Title', render: (r: any) => <Badge variant="gold">{r.title}</Badge> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Faculty</h1>
        <p className="text-muted">{teachers.length} distinguished educators</p>
      </div>
      <DataTable columns={columns} data={teachers} />
    </div>
  );
}