import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
            <GraduationCap className="w-6 h-6 text-black" />
          </div>
          <span className="font-display text-2xl gold-text">TechGeo</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}