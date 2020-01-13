var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', 
require('connect-ensure-login').ensureLoggedIn(),
function(req, res, next) {
  console.log('visit');
  res.render('VisitForm', {user: req.user });
});


module.exports = router;