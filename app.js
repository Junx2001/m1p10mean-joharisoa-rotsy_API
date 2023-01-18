require('dotenv').config();


var express = require('express');
var logger = require('morgan');
const cors = require('cors');
//const mongoose = require('./src/database/DatabaseManager').mongo;
const bodyParser = require('body-parser');

var usersRouter = require('./src/routes/users/user.routes');
var carsRouter = require('./src/routes/cars/car.routes');
var reparationsRouter = require('./src/routes/reparations/reparation.routes');
var paymentsRouter = require('./src/routes/payments/payment.routes');

var app = express();


app.use(cors());

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Routes list
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/reparations', reparationsRouter);
app.use('/payments', paymentsRouter);


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