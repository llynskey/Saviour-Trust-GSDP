var mysql = require('mysql');
var express = require('express');
var visitRouter = require('../routes/VisitForm');
var router = express.Router();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SaviourTrust44',
    port: 3306,
    database: 'saviourtrust'
  });
  
  // function to get an array of house addresses
  module.exports.getHouses = (callback) =>
  {
      var query = 'SELECT houseNumber, street from House';
      
      connection.connect()
      
      // creating array and storing house names
      connection.query(query, function(err, dbRes) {
        if (err)
            console.log(err);
        let houseArray = [];
        houseArray = dbRes;
        
        let addressArray =[];
       // var select = req.body.houseDropDown;
        for(let i = 0; i < houseArray.length; i++)
        {
            // getting next address in the array
            var address = houseArray[i].houseNumber + " " + houseArray[i].street;
            //alert(address);
            addressArray.push(address);
           
        }
        console.log(addressArray);
   
     
        //console.log(houseArray);
        connection.end();
        callback(addressArray);
    });
  };

  // getting the information from visit form 
  function MakeVisit(err, result)
  {
    console.log(req.body);
  
    res.redirect('/visit');
    var visit = {
      kitchen: req.body.kitchen,
      livingRoom: req.body.livingRoom,
      stairsLanding: req.body.stairsLanding,
      bathroom: req.body.bathroom,
      room1Notes: req.body.room1,
      room2Notes: req.body.room2,
      room3Notes: req.body.room3,
      room4Notes: req.body.room4,
      smokeAlarm: req.body.smokeAlarmFault,
      electronicsNote: req.body.electronics
      //cmAlarms: req.body.cmAlarms
      //cmAlarmFault: req.body.cmAlarmFault
      //smokeAlarmLocation: req.body.smokeAlarmLocation
    }

    connection.connect();
    var query = connection.query('insert into HouseVisit set ?', visit, function (err, result){
      if(err)
      {
        // if there is an error it will be displayed on the console
        console.error(err);
        return;
      }
      console.error(result);
    });
    connection.end();
    
  };

