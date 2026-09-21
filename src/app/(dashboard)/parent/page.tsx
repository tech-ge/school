import { StatsCard } from '@/components/ui/StatsCard';
import { Users, CreditCard, BarChart3 } from 'lucide-react';

export default function ParentOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Parent <span className="gold-text">Portal</span></h1>
        <p className="text-muted">Monitor your children&apos;s academic journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Children Enrolled" value={2} icon={Users} />
        <StatsCard label="Outstanding Fees" value="₦45K" icon={CreditCard} accent="accent" />
        <StatsCard label="Avg Performance" value="4.65" icon={BarChart3} trend="+0.2" />
      </div>
    </div>
  );
}