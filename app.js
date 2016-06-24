var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bson = require('bson');
var path = require('path'); 
var app = express();
var router = express.Router();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'builtright',
  resave: false,
  saveUninitialized: true
}));

//Routes 
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/builds', require('./routes/BuildRoutes')); 
app.use('/api/parts', require('./routes/PartRoutes')); 
app.use('/api/auth', require('./passport.js')); 

//Database
var mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/builtright";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log("Connected to db at " + mongoUri);
});


//Port
var port = 4000;
app.listen(process.env.EXPRESS_PORT || port, function() {
  console.log("The Wolverine Pack is hunting on port ", port);
});
