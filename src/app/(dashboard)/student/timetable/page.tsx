const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PERIODS = ['08:00', '10:00', '12:00', '14:00', '16:00'];

const SCHEDULE: Record<string, Record<string, string>> = {
  Monday: { '08:00': 'MTH101', '10:00': 'CSC102', '12:00': '—', '14:00': 'PHY101', '16:00': '—' },
  Tuesday: { '08:00': 'ENG101', '10:00': 'MTH101', '12:00': 'CSC102', '14:00': '—', '16:00': '—' },
  Wednesday: { '08:00': '—', '10:00': 'PHY101', '12:00': 'ENG101', '14:00': 'CSC102', '16:00': 'MTH101' },
  Thursday: { '08:00': 'CSC102', '10:00': '—', '12:00': 'MTH101', '14:00': 'ENG101', '16:00': '—' },
  Friday: { '08:00': 'PHY101', '10:00': 'ENG101', '12:00': '—', '14:00': '—', '16:00': '—' },
};

export default function TimetablePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Timetable</h1>
        <p className="text-muted">Your weekly lecture schedule</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border bg-white/[0.02]">
                <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-muted">Day</th>
                {PERIODS.map((p) => (
                  <th key={p} className="text-left px-6 py-4 text-xs uppercase tracking-widest text-muted">{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((d) => (
                <tr key={d} className="border-b border-bg-border/50">
                  <td className="px-6 py-4 font-semibold">{d}</td>
                  {PERIODS.map((p) => (
                    <td key={p} className="px-6 py-4">
                      {SCHEDULE[d][p] === '—' ? (
                        <span className="text-muted">—</span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-lg bg-gold/10 text-gold border border-gold/30 text-xs font-medium">
                          {SCHEDULE[d][p]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}