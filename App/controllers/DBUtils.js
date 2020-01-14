var mysql = require('mysql');
var express = require('express');

var router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'test'
  });
  
  module.exports.getHouse = (err, result) =>
  {
      var query = 'SELECT houseId, houseNumber, street from House';
      
     connection.connect()
      
      // creating array and storing house names
      connection.query(query, function(err, dbRes) {
        if (err)
            console.log(err);
        let houseArray = [];
        houseArray = dbRes;
        
        let addressArray =[];

        for(let i = 0; i < houseArray.length; i++)
        {
            // getting next address in the array
            var address = houseArray[i].houseId + " " + houseArray[i].houseNumber + " " + houseArray[i].street;

            addressArray.push(address);
           
        }
        console.log(addressArray);
   
     
        //console.log(houseArray);
       // connection.end();
        callback(addressArray);
    });
  };

  // getting the information from visit form 
 // getting the information from visit form 
 module.exports.makeVisit = (req, callback) =>
 {
   console.log(req.body);
 
   // getting house name
   var house = req.body

     var visit = {
     houseId: req.body.houseId,
     hall: req.body.hall,
     kitchen: req.body.kitchen,
     livingRoom: req.body.livingRoom,
     stairsLanding: req.body.stairsLanding,
     bathroom: req.body.bathroom,
     room1Notes: req.body.room1Notes,
     room2Notes: req.body.room2Notes,
     room3Notes: req.body.room3Notes,
     room4Notes: req.body.room4Notes,
     smokeAlarm: req.body.smokeAlarm,
     electronicsNote: req.body.electronicsNote,
     cmAlarms: req.body.cmAlarms,
     cmAlarmFault: req.body.cmAlarmFault,
     cmAlarmLocation: req.body.cmAlarmLocation,
     smokeAlarmLocations: req.body.smokeAlarmLocations
   }

   // splitting the house string to get the house number and street for db query

   console.log(house);

   // getting the id of the current house
   // var houseIdQuery = connectionPool.query('select houseId from house where houseNumber = @houseNumber and street = @street');
   
   //console.log(houseIdQuery);

   //connection.connect();
   var query = connection.query('insert into housevisit set ?', visit, function (err, result){
     if(err)
     {
       // if there is an error it will be displayed on the console
       console.error(err);
       return;
     }
     console.error(result);
   });
   //connection.end();
   console.log("written to database!:D");
   callback();

 };
