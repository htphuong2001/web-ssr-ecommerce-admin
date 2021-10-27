const mongoose = require('mongoose');
const md5 = require('md5');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'sa'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: 'img/default.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) return next();

    user.password = md5(user.password);
    next();
  } catch {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
