import 'dotenv/config';
import { connectDB } from './connect';
import { User } from './models/User';
import { Student } from './models/Student';
import { Teacher } from './models/Teacher';
import { Class } from './models/Class';
import { Subject } from './models/Subject';
import { Fee } from './models/Fee';
import bcrypt from 'bcryptjs';

async function seed() {
  await connectDB();
  console.log('🌱 Seeding TechGeo University…');

  await Promise.all([
    User.deleteMany({}), Student.deleteMany({}), Teacher.deleteMany({}),
    Class.deleteMany({}), Subject.deleteMany({}), Fee.deleteMany({}),
  ]);

  const hash = (p: string) => bcrypt.hashSync(p, 10);

  const admin = await User.create({ name: 'Admin TechGeo', email: 'admin@techgeo.edu', password: hash('admin123'), role: 'ADMIN' });
  const teacherUser = await User.create({ name: 'Dr. Adebayo Ogun', email: 'teacher@techgeo.edu', password: hash('teacher123'), role: 'TEACHER' });
  const studentUser = await User.create({ name: 'Jane Doe', email: 'student@techgeo.edu', password: hash('student123'), role: 'STUDENT' });
  const parentUser = await User.create({ name: 'Mr. Doe', email: 'parent@techgeo.edu', password: hash('parent123'), role: 'PARENT' });

  const teacher = await Teacher.create({ userId: teacherUser._id, name: 'Dr. Adebayo Ogun', email: 'teacher@techgeo.edu', staffId: 'TG/STF/001', department: 'Computer Science', title: 'Professor' });
  const student = await Student.create({ userId: studentUser._id, name: 'Jane Doe', email: 'student@techgeo.edu', matricNo: 'TG/2024/001', department: 'Computer Science', level: '200', parentId: parentUser._id, gpa: 4.82 });

  await Subject.insertMany([
    { code: 'CSC102', name: 'Intro to Programming', credits: 3, department: 'Computer Science' },
    { code: 'MTH101', name: 'Calculus I', credits: 3, department: 'Mathematics' },
    { code: 'PHY101', name: 'General Physics', credits: 3, department: 'Physics' },
    { code: 'ENG101', name: 'English Composition', credits: 2, department: 'Languages' },
  ]);

  await Class.create({ code: 'CSC-2A', name: 'Computer Science Year 2A', department: 'Computer Science', teacherId: teacher._id, students: [student._id], schedule: 'Mon/Wed 10:00' });

  await Fee.insertMany([
    { name: 'Tuition Fee', term: '2026 Spring', amount: 12000000, studentId: student._id, status: 'PENDING', dueDate: new Date('2026-03-31') },
    { name: 'Library Fee', term: '2026 Spring', amount: 500000, studentId: student._id, status: 'PAID' },
  ]);

  console.log('✅ Seed complete!');
  console.log('   Admin:   admin@techgeo.edu / admin123');
  console.log('   Teacher: teacher@techgeo.edu / teacher123');
  console.log('   Student: student@techgeo.edu / student123');
  console.log('   Parent:  parent@techgeo.edu / parent123');
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });