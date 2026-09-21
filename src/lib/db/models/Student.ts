import mongoose, { Schema, models } from 'mongoose';

const StudentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: { type: String, lowercase: true },
  matricNo: { type: String, unique: true, index: true },
  department: String,
  level: String,
  parentId: { type: Schema.Types.ObjectId, ref: 'User' },
  gpa: { type: Number, default: 0 },
}, { timestamps: true });

export const Student = models.Student || mongoose.model('Student', StudentSchema);