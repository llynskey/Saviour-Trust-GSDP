var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var strategy = require('passport-local').Strategy;
var db = require('./db');

const sqlConnection = require('./controllers/DBUtils');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var visitRouter = require('./routes/VisitForm');
var supportRouter = require('./routes/supportWorker');
var logoutRouter = require('./routes/logout');
var createUserRouter = require('./routes/createUser');
var AdminPageRouter = require('./routes/AdminPage');
var createPropertyRouter = require('./routes/createProperty');
var loadVisitRouter = require('./routes/loadVisit');
var visitHouseRouter = require('./routes/houseVisitSubmit');
//var selectHouseVisitRouter = require ('./routes/viewSelectedHouseVisit');


passport.use(new strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visit', visitRouter);
app.use('/supportWorker', supportRouter);
app.use('/logout', logoutRouter);
app.use('/houseVisit', visitHouseRouter);
app.use('/login', indexRouter);
app.use('/createHouse', createPropertyRouter);
app.use('/createUser', createUserRouter);
app.use('/adminPage', AdminPageRouter);

app.use('/loadVisit', loadVisitRouter);
//app.use('/viewSelectedVisit', selectHouseVisitRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err = {} :

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




