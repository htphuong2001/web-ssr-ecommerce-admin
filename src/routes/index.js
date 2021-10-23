const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
  const err = new Error();
  next(err);
});

module.exports = router;
