'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';

export default function MyClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  useEffect(() => { fetch('/api/classes').then((r) => r.json()).then(setClasses); }, []);

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Class' },
    { key: 'schedule', label: 'Schedule' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-display text-4xl">My Classes</h1>
      <DataTable columns={columns} data={classes} />
    </div>
  );
}