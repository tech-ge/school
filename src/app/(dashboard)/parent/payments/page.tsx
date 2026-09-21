'use client';

import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

const PAYMENTS = [
  { ref: 'PSK_1023', student: 'Jane Doe', amount: '₦120,000', date: '2026-01-15', status: 'success' },
  { ref: 'PSK_1024', student: 'John Doe', amount: '₦120,000', date: '2026-01-16', status: 'success' },
];

export default function ParentPaymentsPage() {
  const columns = [
    { key: 'ref', label: 'Reference' },
    { key: 'student', label: 'Student' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (r: any) => <Badge variant="success">{r.status}</Badge> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-display text-4xl">Payment History</h1>
      <DataTable columns={columns} data={PAYMENTS} />
    </div>
  );
}