var express = require("express");
var router = express.Router();
var dbUtils = require("../controllers/DBUtils");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('supportWorker', { title: 'Saviour Trust' });
});
module.exports = router;
