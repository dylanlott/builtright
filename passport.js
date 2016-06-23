module.exports = function() {

  var express = require('express');
  var app = express();
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var User = require('./models/User');
  var UserCtrl = require('./controllers/UserCtrl');
  var cookieParser = require('cookie-parser'); 
  var session = require('express-session'); 
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());
  app.use(session({
    secret: '1d5adg36s5vf2adr7vwefgv1e46b634',
    resave: false,
    saveUninitialized: true
  }));

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

  //Endpoints
  app.get('/api/user', requireAuth, UserCtrl.getUser);
  app.post('/api/users', UserCtrl.createUser);
  app.post('/api/users/auth', passport.authenticate('local'), function(req, res) {
    console.log("Logged In");
    return res.status(200).json(req.user).end();
  });
  app.get('/api/user/loggedin', requireAuth, UserCtrl.checkLoggedIn);
  app.get('/api/logout', function(req, res) {
    req.logout();
    res.status(200).redirect('/');
  });

  return app;
}();
