import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'], required: true },
}, { timestamps: true });

export const User = models.User || mongoose.model('User', UserSchema);