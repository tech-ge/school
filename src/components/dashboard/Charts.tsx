'use client';

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const enrollmentData = [
  { month: 'Sep', students: 8200 },
  { month: 'Oct', students: 8900 },
  { month: 'Nov', students: 9500 },
  { month: 'Dec', students: 10200 },
  { month: 'Jan', students: 11200 },
  { month: 'Feb', students: 12000 },
];

const revenueData = [
  { term: 'Fall', revenue: 4200 },
  { term: 'Spring', revenue: 5800 },
  { term: 'Summer', revenue: 3100 },
];

const deptData = [
  { name: 'Engineering', value: 42 },
  { name: 'Sciences', value: 28 },
  { name: 'Arts', value: 18 },
  { name: 'Business', value: 12 },
];

const COLORS = ['#d4af37', '#6366f1', '#22c55e', '#f97316'];

export function AdminCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass p-6 rounded-2xl lg:col-span-2">
        <h3 className="font-display text-xl mb-6">Student Enrollment Growth</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={enrollmentData}>
            <defs>
              <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4af37" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2030" />
            <XAxis dataKey="month" stroke="#8b92a8" fontSize={12} />
            <YAxis stroke="#8b92a8" fontSize={12} />
            <Tooltip contentStyle={{ background: '#0f121c', border: '1px solid #1c2030', borderRadius: 12 }} />
            <Area type="monotone" dataKey="students" stroke="#d4af37" strokeWidth={2} fill="url(#gold)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass p-6 rounded-2xl">
        <h3 className="font-display text-xl mb-6">Revenue by Term</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2030" />
            <XAxis dataKey="term" stroke="#8b92a8" fontSize={12} />
            <YAxis stroke="#8b92a8" fontSize={12} />
            <Tooltip contentStyle={{ background: '#0f121c', border: '1px solid #1c2030', borderRadius: 12 }} />
            <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass p-6 rounded-2xl">
        <h3 className="font-display text-xl mb-6">Department Distribution</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={deptData} dataKey="value" nameKey="name" outerRadius={90} label>
              {deptData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: '#0f121c', border: '1px solid #1c2030', borderRadius: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}