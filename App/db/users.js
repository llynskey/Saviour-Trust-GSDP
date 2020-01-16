var db = require('../controllers/DBUtils');
var records = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    displayName: "Administrator",
    emails: [{ value: "" }],
    role:"AdminPage"
  },
  {
    id: 2,
    username: "support",
    password: "support",
    displayName: "Support Worker",
    emails: [{ value: "" }],
    role:"supportWorker"
  },
  {
    id: 3,
    username: "visit",
    password: "visit",
    displayName: "House Visitor",
    emails: [{ value: "" }],
    role: "visit"
  }
];

exports.addNewUser = function newUser(req){
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var user = {
    username: req.body.username,
    password: req.body.password,
    firstname: firstname,
    lastname: lastname,
    displayName: firstname+" "+lastname,
    DOB: req.body.DOB,
    Type: req.body.Type
  }
  records.push(user);
}

exports.loadDbUser = function(user)
{
  console.log("user[]" + user[0].userType);

  var newuser = {
    id: 4,
    username: user[0].username,
    password: user[0].userpassword,
    firstname: user[0].firstname,
    lastname: user[0].lastname,
    displayName: user[0].firstname+" "+user.lastname,
    DOB: user[0].dob,
    role: user[0].userType
  }
  console.log("DB" + newuser.username);
  records.push(newuser);
  
}



exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error("User " + id + " does not exist"));
    }
  });
};

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

 /*dbUtils.validateUser(username, function(password) {  

      var userPassword = password;
      console.log(userPassword);
    });*/