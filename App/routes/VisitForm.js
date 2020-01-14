var express = require('express');
var router = express.Router();
var dbUtils = require('../controllers/DBUtils');

/* GET home page. */
router.get('/', 
//require('connect-ensure-login').ensureLoggedIn(),
function(req, res) {

  dbUtils.getHouses(function(data) {
    var houses = data;
    
    console.log(JSON.stringify(houses));
    res.render('VisitForm', {houses: houses });
  });
  
});


module.exports = router;