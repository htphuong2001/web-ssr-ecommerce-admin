const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.63fkh.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);

    console.log('Connected database successful.');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

module.exports = { connectDB };
