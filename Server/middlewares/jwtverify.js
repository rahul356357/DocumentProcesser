var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// require jwt token secret
const jwtConfig = require('../config/jwt.json');

// middleware to authenticate the jwt token passed in the incoming request
router.use(function(req, res, next) {
   //const token =  req.headers['x-access-token'];
   // decode token
  let token = req.query.token; 
  console.log(token);
   if(token) {
     jwt.verify(token, jwtConfig.secret, function(err, decoded) {
       if(err) {
         return res.json({
           success: false,
           message: 'Failed to validate the token'
         });
       }
       else {
         req.user = {
           "email": decoded._doc.email,
           "isAdmin": decoded._doc.isAdmin
         }
         next();
       }
     });
   }
   else {
     // if no token is passes
     return res.status(403).send({
       success: false,
       message: 'No token was passed'
     });
   }
});

module.exports = router;
