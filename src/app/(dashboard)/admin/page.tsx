import { getCurrentUser } from '@/lib/auth/session';
import { connectDB } from '@/lib/db/connect';
import { Student } from '@/lib/db/models/Student';
import { Teacher } from '@/lib/db/models/Teacher';
import { Payment } from '@/lib/db/models/Payment';
import { Class } from '@/lib/db/models/Class';
import { StatsCard } from '@/components/ui/StatsCard';
import { Users, GraduationCap, DollarSign, BookOpen } from 'lucide-react';
import { AdminCharts } from '@/components/dashboard/Charts';

export default async function AdminPage() {
  await connectDB();
  const [students, teachers, classes, payments] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    Class.countDocuments(),
    Payment.find({ status: 'success' }).lean(),
  ]);

  const revenue = payments.reduce((s: number, p: any) => s + (p.amount || 0), 0) / 100;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Admin <span className="gold-text">Command Center</span></h1>
        <p className="text-muted">Complete oversight of TechGeo University operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Total Students" value={students} icon={Users} trend="+12%" />
        <StatsCard label="Faculty" value={teachers} icon={GraduationCap} trend="+3%" />
        <StatsCard label="Active Classes" value={classes} icon={BookOpen} />
        <StatsCard label="Revenue (₦)" value={revenue.toLocaleString()} icon={DollarSign} trend="+28%" accent="accent" />
      </div>

      <AdminCharts />
    </div>
  );
}