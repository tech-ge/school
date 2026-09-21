'use client';

import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

export function PaymentTable({ payments }: { payments: any[] }) {
  const columns = [
    { key: 'reference', label: 'Reference' },
    { key: 'email', label: 'Payer' },
    { key: 'amount', label: 'Amount', render: (r: any) => `₦${((r.amount || 0) / 100).toLocaleString()}` },
    { key: 'status', label: 'Status', render: (r: any) => (
      <Badge variant={r.status === 'success' ? 'success' : r.status === 'failed' ? 'danger' : 'warning'}>
        {r.status}
      </Badge>
    )},
  ];
  return <DataTable columns={columns} data={payments} />;
}