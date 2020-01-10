var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('VisitForm', { title: 'Saviour Trust' });
});

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

  router.get('/visit',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('VisitForm', { user: req.user });
  });
  
module.exports = router;