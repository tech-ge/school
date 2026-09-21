'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

export default function FeesPage() {
  const [fees, setFees] = useState<any[]>([]);
  useEffect(() => { fetch('/api/fees').then((r) => r.json()).then(setFees); }, []);

  const columns = [
    { key: 'name', label: 'Fee' },
    { key: 'term', label: 'Term' },
    { key: 'amount', label: 'Amount', render: (r: any) => `₦${(r.amount / 100).toLocaleString()}` },
    { key: 'status', label: 'Status', render: (r: any) => <Badge variant={r.status === 'PAID' ? 'success' : 'warning'}>{r.status}</Badge> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Fees</h1>
        <p className="text-muted">Manage tuition and service fees</p>
      </div>
      <DataTable columns={columns} data={fees} />
    </div>
  );
}