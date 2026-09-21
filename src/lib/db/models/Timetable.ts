import mongoose, { Schema, models } from 'mongoose';

const TimetableSchema = new Schema({
  classId: { type: Schema.Types.ObjectId, ref: 'Class' },
  day: String,
  startTime: String,
  endTime: String,
  subject: String,
}, { timestamps: true });

export const Timetable = models.Timetable || mongoose.model('Timetable', TimetableSchema);