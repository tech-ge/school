'use client';

import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

export function StudentTable({ students }: { students: any[] }) {
  const columns = [
    { key: 'matricNo', label: 'Matric No' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { key: 'level', label: 'Level', render: (r: any) => <Badge variant="gold">{r.level}</Badge> },
  ];
  return <DataTable columns={columns} data={students} />;
}