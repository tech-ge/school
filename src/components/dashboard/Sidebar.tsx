'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap, LayoutDashboard, Users, BookOpen, Calendar,
  CreditCard, FileText, BarChart3, Bell, Settings, LogOut
} from 'lucide-react';

const MENUS: Record<string, { href: string; label: string; icon: any }[]> = {
  ADMIN: [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/students', label: 'Students', icon: Users },
    { href: '/admin/teachers', label: 'Faculty', icon: Users },
    { href: '/admin/classes', label: 'Classes', icon: BookOpen },
    { href: '/admin/subjects', label: 'Subjects', icon: FileText },
    { href: '/admin/fees', label: 'Fees', icon: CreditCard },
    { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  ],
  TEACHER: [
    { href: '/teacher', label: 'Overview', icon: LayoutDashboard },
    { href: '/teacher/my-classes', label: 'My Classes', icon: BookOpen },
    { href: '/teacher/attendance', label: 'Attendance', icon: Calendar },
    { href: '/teacher/grades', label: 'Grades', icon: FileText },
    { href: '/teacher/assignments', label: 'Assignments', icon: FileText },
  ],
  STUDENT: [
    { href: '/student', label: 'Overview', icon: LayoutDashboard },
    { href: '/student/courses', label: 'Courses', icon: BookOpen },
    { href: '/student/results', label: 'Results', icon: BarChart3 },
    { href: '/student/fees', label: 'Fees', icon: CreditCard },
    { href: '/student/timetable', label: 'Timetable', icon: Calendar },
  ],
  PARENT: [
    { href: '/parent', label: 'Overview', icon: LayoutDashboard },
    { href: '/parent/children', label: 'Children', icon: Users },
    { href: '/parent/payments', label: 'Payments', icon: CreditCard },
  ],
};

export function Sidebar({ role, name }: { role: string; name: string }) {
  const pathname = usePathname();
  const menu = MENUS[role] || MENUS.STUDENT;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-bg-soft/80 backdrop-blur-xl border-r border-bg-border z-30">
      <div className="p-6 border-b border-bg-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
            <GraduationCap className="w-5 h-5 text-black" />
          </div>
          <span className="font-display text-xl gold-text">TechGeo</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                active
                  ? 'bg-gold/10 text-gold border border-gold/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-bg-border">
        <div className="glass p-3 rounded-xl mb-2">
          <div className="text-xs text-muted">Signed in as</div>
          <div className="text-sm font-semibold truncate">{name}</div>
          <div className="text-xs gold-text uppercase tracking-wider">{role}</div>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-red-400 hover:bg-red-500/5 transition">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}