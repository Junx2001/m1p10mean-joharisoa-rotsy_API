require('dotenv').config();


var express = require('express');
var logger = require('morgan');
//const mongoose = require('./src/database/DatabaseManager').mongo;
const bodyParser = require('body-parser');

var usersRouter = require('./src/routes/users/user.routes');
var carsRouter = require('./src/routes/cars/car.routes');
var reparationsRouter = require('./src/routes/reparations/reparation.routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Routes list
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/reparations', reparationsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

module.exports = app;