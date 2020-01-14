var express = require('express');
var router = express.Router();
var dbUtils = require('../controllers/DBUtils');

/* GET home page. */
router.get('/', 
//require('connect-ensure-login').ensureLoggedIn(),
function(req, res) {

  dbUtils.getHouses(function(houseIds, addressArray) {
    var houses = addressArray;
    var houseIds = houseIds;
    
    res.render('VisitForm', { houseIds: houseIds, houses: houses});
    console.log(JSON.stringify(houses));
  });
  
});

module.exports = router;