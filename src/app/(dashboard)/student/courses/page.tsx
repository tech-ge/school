'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => { fetch('/api/subjects').then((r) => r.json()).then(setCourses); }, []);

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Course' },
    { key: 'credits', label: 'Credits' },
    { key: 'status', label: 'Status', render: () => <Badge variant="success">Active</Badge> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-display text-4xl">My Courses</h1>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}