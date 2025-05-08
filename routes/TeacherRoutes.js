const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// POST /api/teachers/register
router.post('/register', async (req, res) => {
  try {
    const { name, teacherId, subject } = req.body;

    if (!name || !teacherId || !subject) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existing = await Teacher.findOne({ teacherId });
    if (existing) {
      return res.status(409).json({ message: 'Teacher ID already exists.' });
    }

    const newTeacher = new Teacher({ name, teacherId, subject });
    await newTeacher.save();

    res.status(201).json({ message: 'Teacher registered successfully.' });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all teachers
router.get('/', async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving teachers' });
    }
  });

  // DELETE a teacher
  router.delete('/:id', async (req, res) => {
    try {
      await Teacher.findByIdAndDelete(req.params.id);
      res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete teacher' });
    }
  });


  router.get('/verify/:teacherId', async (req, res) => {
    const { teacherId } = req.params;
    try {
      console.log('Searching for teacher with id:', teacherId);
      const teacher = await Teacher.findOne({ teacherId });
      if (teacher) {
        console.log('Teacher found:', teacher);
        return res.json({ valid: true, subject: teacher.subject });
      }
      else {
        console.log('Teacher not found');
        return res.json({ valid: false });
      }
    } catch (err) {
      console.error('Error fetching teacher:', err);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // GET teacher by ID
  router.get('/api/teachers/id/:id', async (req, res) => {
    const teacher = await db.collection('teachers').findOne({ teacherId: req.params.id });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.json(teacher);
  });

  router.get('/id/:id', async (req, res) => {
    try {
      const teacher = await Teacher.findOne({ teacherId: req.params.id });
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
      res.json(teacher);
    } catch (err) {
      console.error("Error fetching teacher:", err);
      res.status(500).json({ error: "Server Error" });
    }
  });

  // routes/teacherRoutes.js or similar
router.get('/verify/:id', async (req, res) => {
  const teacher = await Teacher.findOne({ teacherId: req.params.id });
  if (!teacher) return res.status(404).json({ valid: false });
  res.json({ valid: true, subject: teacher.subject });
});



module.exports = router;
