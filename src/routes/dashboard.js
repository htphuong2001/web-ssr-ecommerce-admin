const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middlewares/auth');

router.get('/', checkLogin, (req, res, next) => {
  console.log(req.user);
  res.render('pages/dashboard', {
    titlePage: 'Dashboard',
    user: req.user,
  });
});

module.exports = router;
