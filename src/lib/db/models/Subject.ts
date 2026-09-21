import mongoose, { Schema, models } from 'mongoose';

const SubjectSchema = new Schema({
  code: { type: String, unique: true, required: true },
  name: String,
  credits: { type: Number, default: 3 },
  department: String,
}, { timestamps: true });

export const Subject = models.Subject || mongoose.model('Subject', SubjectSchema);