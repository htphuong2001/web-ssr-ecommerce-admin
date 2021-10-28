const authRouter = require('./auth');
const dashboardRouter = require('./dashboard');
const userRouter = require('./user');

const establish = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/dashboard');
  });
  app.use('/dashboard', dashboardRouter);
  app.use('/', authRouter);
  app.use('/users', userRouter);
};

module.exports = { establish };
