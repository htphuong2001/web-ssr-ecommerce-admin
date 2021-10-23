require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected database successful.');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

module.exports = { connectDB };
