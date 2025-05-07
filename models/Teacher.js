const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 10
  },
  teacherId: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true,
    maxlength: 10
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
