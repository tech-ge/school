import { AdminCharts } from '@/components/dashboard/Charts';

export default function ReportsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Reports & Analytics</h1>
        <p className="text-muted">Deep insights into TechGeo operations</p>
      </div>
      <AdminCharts />
    </div>
  );
}