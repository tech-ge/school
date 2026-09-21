import { connectDB } from '../connect';
import { Payment } from '../models/Payment';

export const paymentRepo = {
  async findAll() {
    await connectDB();
    return Payment.find().sort({ createdAt: -1 }).lean();
  },

  async findByReference(reference: string) {
    await connectDB();
    return Payment.findOne({ reference }).lean();
  },

  async create(data: any) {
    await connectDB();
    return Payment.create(data);
  },

  async update(reference: string, data: any) {
    await connectDB();
    return Payment.findOneAndUpdate({ reference }, data, { new: true });
  },

  async successTotal() {
    await connectDB();
    const result = await Payment.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    return result[0]?.total || 0;
  },

  async count() {
    await connectDB();
    return Payment.countDocuments();
  },
};
