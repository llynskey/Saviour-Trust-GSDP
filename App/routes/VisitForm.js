var express = require('express');
var router = express.Router();
var dbUtils = require('../controllers/DBUtils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('visitForm', { title: 'Saviour Trust' });
});


module.exports = router;