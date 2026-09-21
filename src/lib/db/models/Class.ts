import mongoose, { Schema, models } from 'mongoose';

const ClassSchema = new Schema({
  code: { type: String, unique: true, required: true },
  name: String,
  department: String,
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  schedule: String,
}, { timestamps: true });

export const Class = models.Class || mongoose.model('Class', ClassSchema);