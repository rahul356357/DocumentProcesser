var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// requiring the configuration Files
var mongoConfig = require('./config/mongodb.json');

// middleware for protected routes i.e (jwt token verification)
var verify = require('./middlewares/jwtverify');
// middleware for routes only accessible to admin
var verfiyAdminAccess = require('./middlewares/verfiyAdminAccess');

// require the routes

//public exposed routes
var auth = require('./routes/auth');

// protected route for both normal user and admin
var index = require('./routes/index');
var files = require('./routes/files');

// routes access to only admin
var admin = require('./routes/admin');

var app = express();

// initialize mongoose.Promise to use promise in mongoose
mongoose.Promise = global.Promise;
// reference to ES6 promise implementation
// connect to mongodb
mongoose.connect(mongoConfig.url);
mongoose.connection
  .once('open', () => {
      console.log('Connected to MongoDB');
  }).
  on('error', (error) => {
    console.warn('Error', error);
  });

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
  res.header("Access-Control-Allow-Credentials", true);
  /* for preflight request
  if (req.method === "OPTIONS"){
    res.send(200);
  }*/
  next();
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// protected endpoints or routes (access given to both normal and admin user)
// these will require a jwt token for authentication
app.use('/api',verify);
app.use('/api/files', files);
app.use('/api/a', index);

//protected routes to which only admin has access
app.use('/api/super',verfiyAdminAccess);
app.use('/api/super/secret', admin);

// public routes
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
