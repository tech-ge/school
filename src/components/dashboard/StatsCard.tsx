import { LucideIcon } from 'lucide-react';

export function StatsCard({
  label, value, icon: Icon, trend, accent = 'gold',
}: {
  label: string; value: string | number; icon: LucideIcon; trend?: string; accent?: 'gold' | 'accent';
}) {
  const color = accent === 'gold'
    ? 'text-gold border-gold/30 bg-gold/10'
    : 'text-accent-soft border-accent/30 bg-accent/10';

  return (
    <div className="glass glass-hover card-hover p-6 rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && <span className="text-xs text-green-400">{trend}</span>}
      </div>
      <div className="font-display text-3xl mb-1">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted">{label}</div>
    </div>
  );
}