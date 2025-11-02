// EduQuest/backend/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // The MONGO_URI is pulled from the .env file loaded in server.js
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1); 
  }
};

module.exports = connectDB;
