import { connectDB } from '../connect';
import { Teacher } from '../models/Teacher';

export const teacherRepo = {
  async findAll() {
    await connectDB();
    return Teacher.find().sort({ createdAt: -1 }).lean();
  },

  async findById(id: string) {
    await connectDB();
    return Teacher.findById(id).lean();
  },

  async findByStaffId(staffId: string) {
    await connectDB();
    return Teacher.findOne({ staffId }).lean();
  },

  async create(data: any) {
    await connectDB();
    return Teacher.create(data);
  },

  async update(id: string, data: any) {
    await connectDB();
    return Teacher.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id: string) {
    await connectDB();
    return Teacher.findByIdAndDelete(id);
  },

  async count() {
    await connectDB();
    return Teacher.countDocuments();
  },
};
