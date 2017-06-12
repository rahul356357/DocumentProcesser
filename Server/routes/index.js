var express = require('express');
var router = express.Router();

// TEST ROUTE
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index');
  res.send('Hello from node server');
});

module.exports = router;
