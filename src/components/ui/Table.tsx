export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-bg-border bg-white/[0.02]">{children}</tr>
    </thead>
  );
}

export function TH({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-muted font-medium">
      {children}
    </th>
  );
}

export function TR({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-bg-border/50 hover:bg-white/[0.03] transition">{children}</tr>;
}

export function TD({ children }: { children: React.ReactNode }) {
  return <td className="px-6 py-4">{children}</td>;
}