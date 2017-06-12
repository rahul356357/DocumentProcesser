var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    "success": true,
    "message": "Admin secret route accessed!!"
  });
});

module.exports = router;
