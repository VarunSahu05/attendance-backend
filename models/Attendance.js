const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentRoll: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: Date.now,
  },
  date:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
