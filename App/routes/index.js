var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'saviour'});
});


router.post('/login',
passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/' + req.user.role);
  });

module.exports = router;
