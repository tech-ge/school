import { connectDB } from '../connect';
import { Student } from '../models/Student';

export const studentRepo = {
  async findAll() {
    await connectDB();
    return Student.find().sort({ createdAt: -1 }).lean();
  },

  async findById(id: string) {
    await connectDB();
    return Student.findById(id).lean();
  },

  async findByMatric(matricNo: string) {
    await connectDB();
    return Student.findOne({ matricNo }).lean();
  },

  async create(data: any) {
    await connectDB();
    return Student.create(data);
  },

  async update(id: string, data: any) {
    await connectDB();
    return Student.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id: string) {
    await connectDB();
    return Student.findByIdAndDelete(id);
  },

  async count() {
    await connectDB();
    return Student.countDocuments();
  },
};
