import mongoose, { Schema, models } from 'mongoose';

const FeeSchema = new Schema({
  name: String,
  term: String,
  amount: { type: Number, required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
  status: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PENDING' },
  dueDate: Date,
}, { timestamps: true });

export const Fee = models.Fee || mongoose.model('Fee', FeeSchema);