'use client';

import { Bell, Search } from 'lucide-react';

export function Topbar({ name, role }: { name: string; role: string }) {
  return (
    <header className="sticky top-0 z-20 glass border-b border-bg-border px-6 py-4 flex items-center justify-between">
      <div className="relative hidden md:block w-80">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input className="input-field pl-11 py-2.5 text-sm" placeholder="Search anything…" />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 rounded-xl glass glass-hover flex items-center justify-center">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold animate-pulse" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center font-bold text-black">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold leading-tight">{name}</div>
            <div className="text-xs text-muted uppercase tracking-wider">{role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}