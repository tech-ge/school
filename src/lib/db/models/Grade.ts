import mongoose, { Schema, models } from 'mongoose';

const GradeSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
  subject: String,
  score: Number,
  grade: String,
  term: String,
  marks: Object,
}, { timestamps: true });

export const Grade = models.Grade || mongoose.model('Grade', GradeSchema);