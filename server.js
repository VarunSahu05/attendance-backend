const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ['https://admin-dashboard-eosin-iota-25.vercel.app', 'https://student-app-fawn.vercel.app'],
  credentials: true
}));app.use(express.json());


app.use('/api/teachers', require('./routes/TeacherRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));


const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
