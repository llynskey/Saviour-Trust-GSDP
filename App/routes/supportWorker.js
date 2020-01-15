var express = require("express");
var router = express.Router();
var dbUtils = require("../controllers/DBUtils");

/* GET users listing. */
router.get("/", function(req, res) {
  dbUtils.getHouses(function(houseIds, addressArray) {
    var houses = addressArray;
    var houseIds = houseIds;

    res.render("supportWorker", {
      title: "Saviour Trust",
      houseIds: houseIds,
      houses: houses
    });
  });
});

module.exports = router;
