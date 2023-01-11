require('dotenv').config();


var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

var usersRouter = require('./src/routes/users/user.routes');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbURI = "mongodb+srv://junx:joharisoa2001@clustertestnode.tg9keeg.mongodb.net/garage?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
	.connect(dbURI)
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use('/users', usersRouter);


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