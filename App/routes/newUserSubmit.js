var express = require("express");
var router = express.Router();
var users = require("../db/users");
var dbUtils = require("../controllers/DBUtils");

router.post('/', function(req, res){
 dbUtils.createNewUser(req, function() {});
    res.redirect('AdminPage');
});


module.exports = router;