var express = require("express");
var router = express.Router();
var dbUtils = require("../controllers/DBUtils");

router.post("/", function(req, res) {
  // console.dir(req.body);
  dbUtils.getVisitByDate(req, function(

    error,
    hallNotes,
    kitchenNotes,
    livingRoomNotes,
    stairsNotes,
    bathroomNotes,
    smokeAlarmNotes,
    cmAlarmNotes,
    room1Notes,
    room2Notes,
    room3Notes,
    room4Notes
  ) {
    if(error == "error")
    {
      
    }
    else
    {
    //res.send(200);
    res.json({
      hall: hallNotes,
      kitchen: kitchenNotes,
      livingRoom: livingRoomNotes,
      stairsLanding: stairsNotes,
      bathroom: bathroomNotes,
      smokeAlarm: smokeAlarmNotes,
      cmAlarm: cmAlarmNotes,
      room1: room1Notes,
      room2: room2Notes,
      room3: room3Notes,
      room4: room4Notes
    });
  }
  });
});

module.exports = router;
