'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  useEffect(() => { fetch('/api/subjects').then((r) => r.json()).then(setSubjects); }, []);

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Subject' },
    { key: 'credits', label: 'Credits' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Subjects</h1>
        <p className="text-muted">{subjects.length} subjects offered</p>
      </div>
      <DataTable columns={columns} data={subjects} />
    </div>
  );
}