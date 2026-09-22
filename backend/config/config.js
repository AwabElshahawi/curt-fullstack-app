//Mongoose Configuration
//This file contains the configuration settings for connecting to the MongoDB database using Mongoose.
//Taken from the official Mongoose documentation.


//This part was created to a DNS resolution issue that was causing the app to fail to connect to the database. 
//The DNS servers are set to Google's public DNS servers
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

// Set up default mongoose connection
const mongoDB = process.env.MONGODB_URI

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;