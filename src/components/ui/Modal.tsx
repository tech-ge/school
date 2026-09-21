'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

export function Modal({
  open, onClose, title, children,
}: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass w-full max-w-lg p-8 rounded-3xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl gold-text">{title}</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center transition">
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}