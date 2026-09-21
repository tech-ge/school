'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function GradesPage() {
  const [grades, setGrades] = useState<Record<string, number>>({});
  const students = ['Jane Doe', 'John Smith', 'Mary Johnson', 'Peter Adeyemi'];

  async function submit() {
    const res = await fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grades }),
    });
    if (res.ok) toast.success('Grades submitted');
    else toast.error('Failed to save');
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-4xl mb-2">Enter Grades</h1>
        <p className="text-muted">Record student performance scores</p>
      </div>

      <div className="glass p-6 rounded-2xl space-y-4">
        {students.map((s) => (
          <div key={s} className="flex items-center gap-4">
            <span className="flex-1">{s}</span>
            <input
              type="number" min={0} max={100}
              className="input-field max-w-[120px]"
              placeholder="Score"
              value={grades[s] || ''}
              onChange={(e) => setGrades({ ...grades, [s]: Number(e.target.value) })}
            />
          </div>
        ))}
        <Button onClick={submit}>Submit Grades</Button>
      </div>
    </div>
  );
}