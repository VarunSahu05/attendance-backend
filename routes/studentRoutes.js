const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/register', async (req, res) => {
  try {
    const { name, department, roll } = req.body;

    const newStudent = new Student({ name, department, roll });
    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving students' });
  }
});

// DELETE a student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student' });
  }
});

router.get('/verify/:roll', async (req, res) => {
  const { roll } = req.params;
  try {
    console.log('Searching for student with roll:', roll);  // Log for debugging
    const student = await Student.findOne({ roll: roll });
    if (student) {
      console.log('Student found:', student);  // Log if student is found
      return res.json({ valid: true });
    } else {
      console.log('Student not found');
      return res.json({ valid: false });
    }
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});


// GET /api/students/:roll
router.get('/:roll', async (req, res) => {
  const student = await Student.findOne({ roll: req.params.roll });
  student ? res.json(student) : res.status(404).json({ message: 'Student not found' });
});

// GET /api/students/count/:department
router.get('/count/:department', async (req, res) => {
  const { department } = req.params;
  const count = await Student.countDocuments({ department });
  res.json({ count });
});


module.exports = router;


