export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass p-6 rounded-2xl ${className}`}>{children}</div>;
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-xl mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
    </div>
  );
}