var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var path = require('path');
 var userRouter = require('./Resoures/Users/userRouter');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var app = express();

app.use(session({
  secret: 'OurAppSessionSecrets',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.use('/',userRouter);

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
module.exports = app;

