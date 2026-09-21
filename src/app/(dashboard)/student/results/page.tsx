'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => { fetch('/api/grades').then((r) => r.json()).then(setResults); }, []);

  const gradeVariant = (s: number) => s >= 70 ? 'success' : s >= 50 ? 'warning' : 'danger';

  const columns = [
    { key: 'subject', label: 'Subject' },
    { key: 'score', label: 'Score', render: (r: any) => <Badge variant={gradeVariant(r.score) as any}>{r.score}%</Badge> },
    { key: 'grade', label: 'Grade' },
    { key: 'term', label: 'Term' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-display text-4xl">Results</h1>
      <DataTable columns={columns} data={results} />
    </div>
  );
}