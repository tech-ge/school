import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Topbar name={user.name} role={user.role} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}