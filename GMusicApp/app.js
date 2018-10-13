const createError     = require('http-errors');
const express         = require('express');
const expressLayouts  = require('express-ejs-layouts');
const path            = require('path');
const cookieParser    = require('cookie-parser');
const logger          = require('morgan');
const session         = require('express-session');
const flash           = require('connect-flash');

const passport    = require('./config/ppConfig');
const isLoggedIn  = require('./middleware/isLoggedIn');
const indexRouter = require('./routes/index');
const queueRouter = require('./routes/queue_controller');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ========== Auth ==========
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{_expires : 1 * 24 * 60 * 60 * 1000} // expiration time in ms
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});
// ==========================

app.use('/', indexRouter);
app.use('/queue', queueRouter);

// ========== Auth ==========
app.use('/users', require('./routes/users'));


app.get('/profile', isLoggedIn, function(req, res) {
  console.log(req.user);
  res.render('profile');
});


app.use('/auth', require('./routes/auth_controller.js'));
// ==========================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

