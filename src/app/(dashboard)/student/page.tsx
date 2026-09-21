import { StatsCard } from '@/components/ui/StatsCard';
import { BookOpen, BarChart3, CreditCard, Calendar } from 'lucide-react';

export default function StudentOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Welcome Back, <span className="gold-text">Scholar</span></h1>
        <p className="text-muted">Your academic journey at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Enrolled Courses" value={6} icon={BookOpen} />
        <StatsCard label="Current GPA" value="4.82" icon={BarChart3} trend="+0.15" />
        <StatsCard label="Fees Outstanding" value="₦125K" icon={CreditCard} accent="accent" />
        <StatsCard label="Next Lecture" value="09:00" icon={Calendar} />
      </div>
    </div>
  );
}