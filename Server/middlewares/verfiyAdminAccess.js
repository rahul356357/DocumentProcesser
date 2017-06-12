var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  if(req.user.isAdmin) {
    // the user is an admin
    // to go next middleware
    next();
  }
  else {
    res.status('403').send({
      success: false,
      message: 'User does not has the required access'
    });
  }
});

module.exports = router;
