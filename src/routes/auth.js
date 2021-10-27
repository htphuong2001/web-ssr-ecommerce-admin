const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.getLoginPage);

router.post('/login', authController.handleLogin);

router.post('/signup', authController.signup);

module.exports = router;
