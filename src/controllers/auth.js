require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = (req, res) => {
  console.log(req.body);
  const { username, password, email, fullname, role } = req.body;

  const newUser = new User({
    username,
    password,
    email,
    fullname,
    role,
  });

  newUser.save((err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    }

    if (data) {
      console.log(data);
      res.send(data);
    }
  });
};

const getLoginPage = (req, res) => {
  res.render('pages/login', {
    titlePage: 'Login',
    notification: undefined,
  });
};

const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({
      username: username,
      password: md5(password),
    });
    console.log(user);

    if (!user || !['admin', 'sa'].includes(user.role)) {
      res.render('pages/login', {
        titlePage: 'Login',
        notification: 'Incorrect username or password.',
      });
    } else {
      const data = {
        username: user.username,
        fullname: user.fullname,
        role: user.role,
      };
      const accessToken = jwt.sign(data, process.env.JWT_SECRET);
      res.cookie('jwt_token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
};

const handleLogout = async (req, res, next) => {};

module.exports = { signup, getLoginPage, handleLogin };
