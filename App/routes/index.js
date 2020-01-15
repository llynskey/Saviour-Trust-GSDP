var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Saviour Trust' });
});


router.post('/login',
passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/' + req.user.role);
  });

module.exports = router;
