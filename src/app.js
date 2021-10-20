const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// HTTP logger
app.use(logger('dev'));

// Body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup static file
app.use(express.static('./src/public'));

// Template Engine EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', (req, res) => {
  res.send('Hello word');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
