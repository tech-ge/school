'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function AttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [marks, setMarks] = useState<Record<string, boolean>>({});

  const students = ['Jane Doe', 'John Smith', 'Mary Johnson', 'Peter Adeyemi', 'Grace Okonkwo'];

  async function submit() {
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, marks }),
    });
    if (res.ok) toast.success('Attendance recorded');
    else toast.error('Failed to save');
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Mark Attendance</h1>
        <p className="text-muted">Record today&apos;s class attendance</p>
      </div>

      <div className="glass p-6 rounded-2xl space-y-4">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field max-w-xs" />

        <div className="space-y-2">
          {students.map((s) => (
            <div key={s} className="flex items-center justify-between p-4 rounded-xl bg-bg-soft/50 border border-bg-border">
              <span>{s}</span>
              <button
                onClick={() => setMarks({ ...marks, [s]: !marks[s] })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  marks[s] ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-white/5 text-white/60 border border-white/10'
                }`}
              >
                {marks[s] ? 'Present' : 'Absent'}
              </button>
            </div>
          ))}
        </div>

        <Button onClick={submit}>Save Attendance</Button>
      </div>
    </div>
  );
}