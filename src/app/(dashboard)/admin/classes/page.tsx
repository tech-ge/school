'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  useEffect(() => { fetch('/api/classes').then((r) => r.json()).then(setClasses); }, []);

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Class Name' },
    { key: 'department', label: 'Department' },
    { key: 'students', label: 'Enrolled', render: (r: any) => <Badge variant="gold">{r.students?.length || 0}</Badge> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Classes</h1>
        <p className="text-muted">{classes.length} active courses</p>
      </div>
      <DataTable columns={columns} data={classes} />
    </div>
  );
}