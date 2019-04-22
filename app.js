require('dotenv').config();
const config = require('./config');
config.envCheck();
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport');
require('./config/passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes')
const { checkDirectorySync } = require('./helpers');
const http = require('http');

const app = express();
checkDirectorySync('tmp');
checkDirectorySync('uploads');

// DB setup
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());
app.use(passport.initialize());
app.use('/api',routes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  /*     res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {}; */

  if (err instanceof Error) err = err.toString()

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message || err.toString(), info: err } });
  // res.render('error', err)
});

module.exports = app;
