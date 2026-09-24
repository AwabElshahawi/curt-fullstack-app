const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/config');
// Auth routes and Middleware
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/task');
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/task', taskRoutes);

// DB connection
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + (process.env.PORT));
  });
});

