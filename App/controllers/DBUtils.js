var mysql = require("mysql");
var express = require("express");

var router = express.Router();

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "SaviourTrust44",
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
        var address = houseArray[i].houseNumber + " " + houseArray[i].street;
        houseIds.push(houseId);
        addressArray.push(address);
      }

      callback(houseIds, addressArray);
    });
  });
};

// getting the information from visit form
module.exports.makeVisit = (req, callback) => {
  var date = new Date();
  var formatted_date =   date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2))    + "-" +  date.getDate();

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
  callback();

});
};


module.exports.getWorker = callback => {
  
  var query = "SELECT * FROM worker ORDER BY workerId";
  
  connection.getConnection(function(err, connection) {
  // running query to add workers from db to array of workers 
  connection.query(query, function(err, dbRes) {
    let workerArray = [];
    workerArray = dbRes;

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
      
      callback(visitDates);

    });
  });
}
module.exports.getVisitByDate = (req, callback)=> {
// getting houseId
var houseId = req.body.houseId;
var dateOfVisit = req.body.dateOfVisit;

// using filter to search by houseId variable
filter  = [houseId, dateOfVisit];
console.dir(filter);
// quer to get an array of with all the latest visit details found by appropriate houseId
var query = "SELECT * FROM housevisit WHERE houseId = ? AND dateOfVisit = ? ORDER BY visitId DESC LIMIT 0, 1";
connection.getConnection(function(err, connection) {
  // creating array and storing house names
  connection.query(query, filter, function(err, dbRes) {
    if (err) console.log(err);
    let visitArray = [];
    visitArray = dbRes;

    if (visitArray[0] != undefined)
    {
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
    var error;
     //for loop to create address strings and send to array
     console.log("defined");
     callback(error, hallNotes, kitchenNotes,livingRoomNotes,stairsNotes,bathroomNotes, smokeAlarmNotes, cmAlarmNotes,room1Notes,room2Notes,room3Notes,room4Notes);
    }
     
      
     else
     {
       error = "error";
       console.log("undefined")
       callback(error);
     }
    
  });
});
};

module.exports.createNewUser = (req, callback)=>{

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var fullname = firstname+" "+lastname;
  var dob = req.body.DOB;
  var user = {
    username: req.body.username,
    userpassword: req.body.password,
    firstname: firstname,
    lastname: lastname,
    displayname: fullname,
    dob: dob,
    userType: req.body.Type
  };

  connection.getConnection(function(err, connection) {
    var query = 
    connection.query("insert into useraccounts set ?", user, function(err, dbRes) {
      
        if (err) {
          // if there is an error it will be displayed on the console
          console.error(err);
          return;
        }
      });
    callback();
  
  });
};

module.exports.createHouse = (req, callback) => {
  console.log(req.body);
  
  var house = {
    houseNumber: req.body.houseNumber,
    street: req.body.street,
    city: req.body.city,
    county: req.body.county,
    postcode: req.body.postcode
  
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
    callback();
  
  });
};

module.exports.validateUser = (username, callback) => {

  
  // passing through params
  filter = [username]

  var query = "SELECT * FROM useraccounts WHERE username = ?";
  connection.query(query, filter, function(err, dbRes) {
    if (err) console.log(err);
    // getting user
    var user = [];
    
    user = dbRes;
    console.log("user" + user);
    if (user[0] != undefined)
    {
      console.log("defined");
      callback(user);
    }
    else
    {
      console.log("undefined")
      callback();
    }

});
};
  