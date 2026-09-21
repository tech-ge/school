import mongoose, { Schema, models } from 'mongoose';

const AttendanceSchema = new Schema({
  classId: { type: Schema.Types.ObjectId, ref: 'Class' },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
  date: Date,
  present: Boolean,
  marks: Object,
}, { timestamps: true });

export const Attendance = models.Attendance || mongoose.model('Attendance', AttendanceSchema);