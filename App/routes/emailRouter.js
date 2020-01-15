var express = require("express");
var router = express.Router();
var email = require("../controllers/emailController");

router.post("/", function(req, res)
{
    console.log("Sending Email");
    email.sendEmail(req, function() {
    console.log("email sent! :D");
    
    });
});
module.exports = router;