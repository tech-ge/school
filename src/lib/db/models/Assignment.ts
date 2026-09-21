import mongoose, { Schema, models } from 'mongoose';

const AssignmentSchema = new Schema({
  title: String,
  description: String,
  dueDate: Date,
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  classId: { type: Schema.Types.ObjectId, ref: 'Class' },
}, { timestamps: true });

export const Assignment = models.Assignment || mongoose.model('Assignment', AssignmentSchema);