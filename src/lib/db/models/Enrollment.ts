import mongoose, { Schema, models } from 'mongoose';

const EnrollmentSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
  status: { type: String, enum: ['ENROLLED', 'DROPPED'], default: 'ENROLLED' },
  enrolledAt: { type: Date, default: Date.now },
}, { timestamps: true });

EnrollmentSchema.index({ studentId: 1, subjectId: 1 }, { unique: true });

export const Enrollment = models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);
