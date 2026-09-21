import mongoose, { Schema, models } from 'mongoose';

const ParentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  children: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

export const Parent = models.Parent || mongoose.model('Parent', ParentSchema);