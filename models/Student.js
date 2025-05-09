const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  roll: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Student', studentSchema);
