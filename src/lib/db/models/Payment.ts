import mongoose, { Schema, models } from 'mongoose';

const PaymentSchema = new Schema({
  reference: { type: String, unique: true, index: true, required: true },
  feeId: { type: Schema.Types.ObjectId, ref: 'Fee' },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
  amount: Number,
  email: String,
  status: { type: String, default: 'pending' },
  paystackData: Object,
  paidAt: Date,
}, { timestamps: true });

export const Payment = models.Payment || mongoose.model('Payment', PaymentSchema);