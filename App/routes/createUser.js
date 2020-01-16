var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('createUser', { title: 'Saviour Trust' });
});

module.exports = router;