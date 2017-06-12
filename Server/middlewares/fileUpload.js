var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');

router.use(function(req, res, next){
  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      let destination = `uploads/${req.user.email}`;
      console.log(file);
      fs.existsSync(destination) || fs.mkdirSync(destination);
      cb(null, destination);
    },
    filename: function(req, file, cb) {
      cb(null,Date.now() + path.extname(file.originalname));
    }
  });
  let upload = multer({
    storage: storage
  }).single('file');
  req.upload = upload;
  next();
});


module.exports = router;
