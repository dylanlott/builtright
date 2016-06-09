//STUDIOKEEPER
//REQUIRES
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
  secret: '1d5adg36s5vf2adr7vwefgv1e46b634',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Controllers 
var UserCtrl = require('./controllers/UserCtrl');

//Routes 
app.use('/users', require('./routes/UserRoutes'));
app.use('/builds', require('./routes/BuildRoutes')); 

//Models
var User = require('./models/User');

//Database
var mongoUri = "mongodb://localhost:27017/builtright";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log("Connected to db at " + mongoUri);
});

//Local Login
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  console.log(username, password)
  User.findOne({ email: username }).exec().then(function(user) {
    if (!user) {
      return done(null, false);
      console.log('no user');
    }
    user.comparePassword(password).then(function(isMatch) {
      if (!isMatch) {
        console.log('no match');
        return done(null, false);
      }
      return done(null, user);
    });
  });
}));

//Authorization
var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).send({ message: "Not logged in." }).end();
  }
  return next();
}

//Deserializer
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/* Endpoints 
 **********************************************************************/
//Auth
app.get('/user', UserCtrl.getUser);
  app.post('/users', UserCtrl.createUser);
app.post('/users/auth', passport.authenticate('local'), function(req, res) {
  console.log("Endpoint hit: ", req); 
  console.log("Logged In", req.user);
  return res.status(200).json(req.user).end();
});

//Port
var port = 4000;
app.listen(process.env.EXPRESS_PORT || port, function() {
  console.log("The Wolverine Pack is hunting on port ", port);
});
