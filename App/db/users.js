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
    displayName: "Support Worker",
    emails: [{ value: "" }],
    role: "visit"
  }
];

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
