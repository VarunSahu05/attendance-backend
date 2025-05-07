const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.post('/mark', async (req, res) => {
  try {

    console.log('Request Body:', req.body); // Debugging
    const { studentName, studentRoll, department, teacherName, teacherId, subject, sessionId, timestamp, date } = req.body;

    if (!studentName || !studentRoll || !department || !teacherName || !teacherId || !subject || !sessionId || !date) {
      console.log('Missing required fields'); // Debugging
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const alreadyMarked = await Attendance.findOneAndDelete({ studentRoll, sessionId, date });
    if (alreadyMarked) {
      console.log('Attendance already marked'); // Debugging
      return res.status(400).json({ message: 'Attendance already marked' });
    }
    else{
      const newAttendance = new Attendance(req.body);
      await newAttendance.save();
      res.status(200).json({ message: 'Attendance marked successfully' });
    }

  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/check', async (req, res) => {
  try {
    const { studentRoll, sessionId, date } = req.body;

    if (!studentRoll || !sessionId || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const alreadyMarked = await Attendance.findOne({ studentRoll, sessionId, date });

    if (alreadyMarked) {
      console.log('Attendance already marked:', alreadyMarked); // Debugging
      return res.status(200).json({ exists: true, message: 'Attendance already marked' });
    }

    console.log('No attendance record found for:', { studentRoll, sessionId, date });
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Error checking attendance:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/attendance', async (req, res) => {
  try {
    const { studentRoll } = req.query;

    let query = {};
    if (studentRoll) {
      query.studentRoll = studentRoll; // Filter by roll number if provided
    }

    const attendanceRecords = await Attendance.find(query);
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/logs', async (req, res) => {
  try {
    const logs = await Attendance.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

router.get('/student/:roll', async (req, res) => {
  try {
    const records = await Attendance.find({ studentRoll: req.params.roll });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

module.exports = router;
