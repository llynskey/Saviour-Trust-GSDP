var mysql = require("mysql");
var express = require("express");

var router = express.Router();

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "test"
});

module.exports.getHouses = callback => {
  //sql query command
  var query = "SELECT houseId, houseNumber, street from house";

  connection.getConnection(function(err, connection) {
    // creating array and storing house names
    connection.query(query, function(err, dbRes) {
      if (err) console.log(err);
      let houseArray = [];

      houseArray = dbRes;

      let houseIds = [];
      let addressArray = [];

      //for loop to create address strings and send to array
      for (let i = 0; i < houseArray.length; i++) {
        // getting next address in the array
        var houseId = houseArray[i].houseId;
        console.log(houseId);
        var address = houseArray[i].houseNumber + " " + houseArray[i].street;
        houseIds.push(houseId);
        addressArray.push(address);
      }
      console.log(addressArray);

      // connection.end();
      callback(houseIds, addressArray);
    });
  });
};

// getting the information from visit form
module.exports.makeVisit = (req, callback) => {
  console.log(req.body);
  var date = new Date();
  var formatted_date =   date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2))    + "-" +  date.getDate();

  //var formattedDate = convertDate(date);
  // creating a visit variable that contains all data fields
  var visit = {
    houseId: req.body.houseId,
    dateOfVisit: formatted_date,
    hall: req.body.hall,
    kitchen: req.body.kitchen,
    livingRoom: req.body.livingRoom,
    stairsLanding: req.body.stairsLanding,
    bathroom: req.body.bathroom,
    room1Notes: req.body.room1Notes,
    room2Notes: req.body.room2Notes,
    room3Notes: req.body.room3Notes,
    room4Notes: req.body.room4Notes,
    electronicsNote: req.body.electronicsNote,
    smokeAlarm: req.body.smokeAlarmFault,
    cmAlarms: req.body.cmAlarmFault,
    //cmAlarmFault: req.body.cmAlarmFault,
    cmAlarmLocation: req.body.cmAlarmLocation,
    smokeAlarmLocations: req.body.smokeAlarmLocations
  };

  connection.getConnection(function(err, connection) {
    var query = connection.query(
      "insert into housevisit set ?",
      visit,
      function(err, result) {
        if (err) {
          // if there is an error it will be displayed on the console
          console.error(err);
          return;
        }
        console.error(result);
      }
    );
    console.log("written to database!:D");
    callback();
  });
};


// function for getting worker details from form and writing to database
module.exports.createWorker = (req, callback) => {
console.log(req.body);

var worker = {
  workerId: req.body.workerId,
  userId: req.body.workerId,
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  dob: req.body.dob,
  gender: req.body.gender
};
connection.getConnection(function(err, connection) {
  var query = connection.query(
    "insert into worker set ?",
    worker,
    function(err, result) {
      if (err) {
        // if there is an error it will be displayed on the console
        console.error(err);
        return;
      }
      console.error(result);
    });
  console.log("written to database!:D");
  callback();

});
};

module.exports.createHouse = (req, callback) => {
console.log(req.body);

var house = {
  houseId: req.body.houseId,
  houseNumber: req.body.houseNumber,
  street: req.body.street,
  city: req.body.city,
  counter: req.body.county,
  postcode: req.body.postcode

  //room1 = req.body.room1Id
};
connection.getConnection(function(err, connection) {
  var query = connection.query(
    "insert into house set ?",
    house,
    function(err, result) {
      if (err) {
        // if there is an error it will be displayed on the console
        console.error(err);
        return;
      }
      console.error(result);
    });
  console.log("written to database!:D");
  callback();

});
};

module.exports.getWorker = callback => {
  console.log(req.body);

  

  var query = "SELECT * FROM worker ORDER BY workerId";
  
  connection.getConnection(function(err, connection) {
  // running query to add workers from db to array of workers 
  connection.query(query, function(err, dbRes) {
    let workerArray = [];
    workerArray = dbRes;

    console.log(workerArray);
  });
    callback(workerArray);
  });
};

// function to get an array of dates that a house has been visited
module.exports.getVisitDates = (req, callback) =>
{
  var houseId = req.body.houseId;

  filter = [houseId];
  console.log(filter);
  var query = ("SELECT dateOfVisit from housevisit where houseId = ?");
  connection.getConnection(function(err, connection)
  {
    connection.query(query, filter, function(err, dbRes)
    {
      if (err) console.log(err);
      let visitDates = [];
      visitDates = dbRes;
      
      for(let i = 0; i < visitDates.length; i++)
      {
      console.dir("THESE ARE THE DATES: " + visitDates[i]);
      }

     // JSON.stringify(visitDates);
      callback(visitDates);

    });
  });
}
module.exports.getVisitByDate = (req, callback)=> {
// getting houseId
var houseId = req.body.houseId;
var dateOfVisit = req.body.dateOfVisit;

console.dir("DATE:" + dateOfVisit);
console.log("houseId");

// using filter to search by houseId variable
filter  = [houseId, dateOfVisit];
console.dir(filter);
// quer to get an array of with all the latest visit details found by appropriate houseId
var query = "SELECT * FROM housevisit WHERE houseId = ? AND dateOfVisit = ?";
connection.getConnection(function(err, connection) {
  // creating array and storing house names
  connection.query(query, filter, function(err, dbRes) {
    if (err) console.log(err);
    let visitArray = [];
    
    visitArray = dbRes;
    console.dir(dbRes);
    var hallNotes = visitArray[0].hall;
    var kitchenNotes = visitArray[0].kitchen;
    var livingRoomNotes = visitArray[0].livingRoom;
    var stairsNotes = visitArray[0].stairsLanding;
    var bathroomNotes = visitArray[0].bathroom;
    var smokeAlarmNotes = visitArray[0].smokeAlarm;
    var cmAlarmNotes = visitArray[0].cmAlarms;
    var room1Notes = visitArray[0].room1Notes;
    var room2Notes = visitArray[0].room2Notes;
    var room3Notes = visitArray[0].room3Notes;
    var room4Notes = visitArray[0].room4Notes;
    
     //for loop to create address strings and send to array

    
    // connection.end();
    callback(hallNotes, kitchenNotes,livingRoomNotes,stairsNotes,bathroomNotes, smokeAlarmNotes, cmAlarmNotes,room1Notes,room2Notes,room3Notes,room4Notes);
 
  });
});
};

/*function convertDate(dateString, callback){
  var dateparts = dateString.split('-');
  var newDate = dateparts[2]+"-"+dateparts[1]+"-"+dateparts[0];
  callback();

  return newDate;
};*/