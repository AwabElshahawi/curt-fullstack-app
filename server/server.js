const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config');


connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT));
  });
});

