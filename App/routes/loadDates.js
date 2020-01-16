var express = require("express");
var router = express.Router();
var dbUtils = require("../controllers/DBUtils");

router.post("/", function(req, res) {
    dbUtils.getVisitDates(req, function(visitDates) 
        {

        console.dir("Date: " + visitDates);
        console.log(JSON.stringify(visitDates));
        res.json(visitDates);

    });
});

module.exports = router;