var express = require('express');
var router = express.Router();
var dbUtils = require('../controllers/DBUtils');

/* GET home page. */
router.get('/', 
//require('connect-ensure-login').ensureLoggedIn(),
function(req, res, next) {

  dbUtils.getHouses(function(data) {
    var houses = data;
    
    
    console.log(JSON.stringify(houses));
    res.render('VisitForm', {user: req.user, houses: houses });
  });
  

  console.log('visit');
  res.render('VisitForm', {user: req.user, houses: houses });
});


module.exports = router;