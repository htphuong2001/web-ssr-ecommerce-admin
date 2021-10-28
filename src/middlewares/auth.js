require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkLogin = async (req, res, next) => {
  const token = req.cookies['jwt_token'];
  if (!token) res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });
    req.user = user;
    next();
  } catch (error) {
    res.redirect('/login');
  }
};

module.exports = { checkLogin };
