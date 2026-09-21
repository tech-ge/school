'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { CreditCard } from 'lucide-react';

export default function StudentFeesPage() {
  const [fees, setFees] = useState<any[]>([]);

  useEffect(() => { fetch('/api/fees').then((r) => r.json()).then(setFees); }, []);

  async function pay(fee: any) {
    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feeId: fee._id, email: 'student@techgeo.edu' }),
      });
      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else toast.error('Payment init failed');
    } catch { toast.error('Payment error'); }
  }

  const columns = [
    { key: 'name', label: 'Fee' },
    { key: 'term', label: 'Term' },
    { key: 'amount', label: 'Amount', render: (r: any) => `₦${(r.amount / 100).toLocaleString()}` },
    { key: 'status', label: 'Status', render: (r: any) => (
      <Badge variant={r.status === 'PAID' ? 'success' : 'warning'}>{r.status}</Badge>
    )},
    { key: 'action', label: '', render: (r: any) => r.status !== 'PAID' && (
      <Button onClick={() => pay(r)} className="!py-2 !px-4 text-xs">
        <CreditCard className="w-3.5 h-3.5" /> Pay
      </Button>
    )},
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Fees & Payments</h1>
        <p className="text-muted">Settle your outstanding balances securely</p>
      </div>
      <DataTable columns={columns} data={fees} />
    </div>
  );
}