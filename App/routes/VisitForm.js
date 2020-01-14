var express = require('express');
var router = express.Router();
var dbUtils = require('../controllers/DBUtils');

/* GET home page. */
router.get('/', 
//require('connect-ensure-login').ensureLoggedIn(),
function(req, res) {

  dbUtils.getHouses(function(addressArray, houseId) {
    var houses = [];
    var houseIds = [];
    for(var i = 0; i < addressArray.length; i++)
    {
      // pushing each address into array of houses to display to drop down menu
      houses.push(addressArray);
      houseIds.push(houseId);
    }
    res.render('VisitForm', {houses: houses, houseIds: houseIds });
    console.log(JSON.stringify(houses));
  });
  
});


module.exports = router;