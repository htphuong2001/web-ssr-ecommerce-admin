require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoDBConfig = require('./configs/mongoDB');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

// Connect DB
mongoDBConfig.connectDB();

// HTTP logger
app.use(logger('dev'));

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup static file
app.use(express.static('./src/public'));

// Template Engine EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Router
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Page not Found
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  err.status = err.status || 500;
  res.status(err.status).render('pages/error', {
    titlePage: 'Error',
    error: err,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
