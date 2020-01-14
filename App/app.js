var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var passport = require('passport')
//var strategy = require('passport-local').Strategy;
var db = require('./db');

const sqlConnection = require('./controllers/DBUtils');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var visitRouter = require('./routes/VisitForm');
var supportRouter = require('./routes/support');
var logoutRouter = require('./routes/logout');
var houseVisitRouter = require("./routes/houseVisitSubmit");
/*
passport.use(new strategy(
  function(username, password, done) {
    User.findOne({ username= username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message= 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message= 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));



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
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//app.use(passport.initialize());
//app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visit', visitRouter);
app.use('/support', supportRouter);
app.use('/logout', logoutRouter);
app.use('/houseVisit', houseVisitRouter);


// we need this to get data from form

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




