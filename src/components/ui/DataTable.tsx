'use client';

export function DataTable<T extends Record<string, any>>({
  columns, data, empty = 'No records found',
}: {
  columns: { key: string; label: string; render?: (row: T) => React.ReactNode }[];
  data: T[]; empty?: string;
}) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-bg-border bg-white/[0.02]">
              {columns.map((c) => (
                <th key={c.key} className="text-left px-6 py-4 text-xs uppercase tracking-widest text-muted font-medium">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-muted">
                  {empty}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="border-b border-bg-border/50 hover:bg-white/[0.03] transition">
                  {columns.map((c) => (
                    <td key={c.key} className="px-6 py-4">
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}