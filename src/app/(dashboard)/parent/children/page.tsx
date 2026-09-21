'use client';

import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

const CHILDREN = [
  { name: 'Jane Doe', matricNo: 'TG/2024/001', level: '200', gpa: 4.82, status: 'Active' },
  { name: 'John Doe', matricNo: 'TG/2024/002', level: '100', gpa: 4.51, status: 'Active' },
];

export default function ChildrenPage() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'matricNo', label: 'Matric No' },
    { key: 'level', label: 'Level' },
    { key: 'gpa', label: 'GPA', render: (r: any) => <Badge variant="gold">{r.gpa}</Badge> },
    { key: 'status', label: 'Status', render: (r: any) => <Badge variant="success">{r.status}</Badge> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-display text-4xl">My Children</h1>
      <DataTable columns={columns} data={CHILDREN} />
    </div>
  );
}