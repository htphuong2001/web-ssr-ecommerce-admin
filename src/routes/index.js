const authRouter = require('./auth');
const userRouter = require('./user');

const establish = (app) => {
  app.use('/', authRouter);
  app.use('/users', userRouter);
};

module.exports = { establish };
