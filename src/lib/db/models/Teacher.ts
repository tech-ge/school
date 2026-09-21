import mongoose, { Schema, models } from 'mongoose';

const TeacherSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: { type: String, lowercase: true },
  staffId: { type: String, unique: true },
  department: String,
  title: { type: String, default: 'Lecturer' },
}, { timestamps: true });

export const Teacher = models.Teacher || mongoose.model('Teacher', TeacherSchema);