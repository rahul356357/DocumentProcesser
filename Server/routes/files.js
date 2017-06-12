var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var fileUpload = require('../middlewares/fileUpload');

const UserFile = require('../models/userFile');


// route to get all the files of a user
router.get('/', function(req, res) {
  UserFile.find({
      email: req.user.email,
      processed :{$ne:'deleted'}
    })
    .then((files) => {
      res.json({
        success: true,
        files: files
      })
    })
    .catch((err) => {
      res.status('500').send(err);
    })
});

// route to get a file
router.get('/:filename',function(req, res) {
  const filePath = `uploads/${req.user.email}/${req.params.filename}`;
  res.sendFile(filePath,{root: path.join(__dirname,'../')},function(err) {
    if(err){
      res.status(err.status).send({
        "message": "Error occured in retriving file"
      });
    }
  });
});

//route to upload a file to server
router.post('/', fileUpload, function(req, res) {
  req.upload(req, res, function(err) {
    if (err) {
      res.json({
        success: false,
        message: 'File upload failed'
      });
    } else {
      console.log(req.file);
      let userFile = new UserFile({
        email: req.user.email,
        fileinfo : {
          path: req.file.path,
          mimetype: req.file.mimetype,
          filename: req.file.filename,
          originalname: req.file.originalname,
          encoding: req.file.encoding
        }
      });
      userFile.save().
      then(() => {
        res.json({
          success: true,
          file: userFile,
          message: 'file status save to mongo'
        });
      }).
      catch((err) => {
        res.status('500').send(err);
      });
    }
  });
});

// route to update the file status to deleted
router.delete('/:fileid', function(req, res) {
  UserFile.findOneAndUpdate({
    email: req.user.email,
    fileid: req.params.fileid
  }, {
    processed: 'deleted'
  }, {
    new: true
  }).
  then((file) => {
    res.json({
      file: file,
      success: file ? true : false,
      message: file ? 'Record deleted' : 'No such record found'
    })
  }).
  catch((err) => {
    res.status('500').send(err);
  })
});


module.exports = router;
