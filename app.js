const createError = require('http-errors');
const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const quizRouter = require('./routes/quiz');
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api');
const config = require('./config');

const app = express();

// database connection setting
mongoose.connect(config.connectToDatabase('segae_data'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('disconnected', console.log.bind(console, '\nconnected\n'));
db.once('open', () => { console.log('\nconnected\n'); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use(cookieSession({
  name: config.cookie.name,
  keys: config.cookie.keys,
  maxAge: config.cookie.maxAge
}));

app.use('/', indexRouter);
app.use('/topics', articlesRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
