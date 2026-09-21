'use client';

import { Loader2 } from 'lucide-react';

export function Button({
  children, variant = 'gold', loading, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'gold' | 'ghost' | 'danger'; loading?: boolean;
}) {
  const cls = {
    gold: 'btn-gold',
    ghost: 'btn-ghost',
    danger: 'px-6 py-3 rounded-xl font-medium bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition',
  }[variant];

  return (
    <button {...props} disabled={loading || props.disabled} className={`${cls} inline-flex items-center justify-center gap-2 disabled:opacity-50 ${props.className || ''}`}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}