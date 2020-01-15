var express = require("express");
var router = express.Router();
var dbUtils = require("../controllers/DBUtils");
var email = require("../controllers/emailController");

router.post("/", function(req, res) {
  console.log("calling function!!! :D");

  dbUtils.makeVisit(req, function() {});

    
    res.sendStatus(200);
    console.log("called function!! :D");
    
  

});

module.exports = router;
