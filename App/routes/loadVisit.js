var express = require("express");
var router = express.Router();
var dbUtils = require("../controllers/DBUtils");

router.post("/", function(req, res) {
  // console.dir(req.body);
  dbUtils.getLatestHouseVisit(req, function(
    hallNotes,
    kitchenNotes,
    livingRoomNotes,
    stairsNotes,
    bathroomNotes,
    room1Notes,
    room2Notes,
    room3Notes,
    room4Notes
  ) {

    //res.send(200);
    res.json({
      hall: hallNotes,
      kitchen: kitchenNotes,
      livingRoom: livingRoomNotes,
      stairsLanding: stairsNotes,
      bathroom: bathroomNotes,
      room1: room1Notes,
      room2: room2Notes,
      room3: room3Notes,
      room4: room4Notes
    });
  });
});

module.exports = router;
