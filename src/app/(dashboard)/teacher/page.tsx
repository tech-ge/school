import { StatsCard } from '@/components/ui/StatsCard';
import { BookOpen, Users, FileText, Calendar } from 'lucide-react';

export default function TeacherOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Faculty <span className="gold-text">Dashboard</span></h1>
        <p className="text-muted">Manage your classes and students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="My Classes" value={5} icon={BookOpen} />
        <StatsCard label="Students" value={187} icon={Users} trend="+8%" />
        <StatsCard label="Pending Grades" value={23} icon={FileText} />
        <StatsCard label="Today's Lectures" value={3} icon={Calendar} accent="accent" />
      </div>
    </div>
  );
}