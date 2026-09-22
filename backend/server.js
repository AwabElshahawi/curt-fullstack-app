const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/config');
// Auth routes and Middleware
const authRoutes = require('./routes/auth');
app.use(express.json());
app.use('/api/auth', authRoutes);

// DB connection
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + (process.env.PORT));
  });
});

