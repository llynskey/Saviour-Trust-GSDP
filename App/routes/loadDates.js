var express = require("express");
var router = express.Router();
var dbUtils = require("../controllers/DBUtils");

router.post("/", function(req, res) {
    dbUtils.getLatestHouseVisit(req, function(visitDates) 
        {

        console.log(visitDates);
    
        res.json({dates: visitDates});

    });
});

module.exports = router;