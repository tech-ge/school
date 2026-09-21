import mongoose, { Schema, models } from 'mongoose';

const GradeSchema = new Schema({
  classId: { type: Schema.Types.ObjectId, ref: 'Class' },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
  subject: String,
  score: Number,
  grade: String,
  term: String,
}, { timestamps: true });

export const Grade = models.Grade || mongoose.model('Grade', GradeSchema);