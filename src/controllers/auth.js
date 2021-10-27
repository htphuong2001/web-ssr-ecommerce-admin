const md5 = require('md5');
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
    const user = await User.findOne({ username: username });
    console.log(user);

    if (!user || user.password != md5(password)) {
      res.render('pages/login', {
        titlePage: 'Login',
        notification: 'Incorrect username or password.',
      });
    } else {
      res.send('success');
    }
  } catch (err) {
    next(err);
  }
};

const handleLogout = async (req, res, next) => {};

module.exports = { signup, getLoginPage, handleLogin };
