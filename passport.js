module.exports = function() {

  var express = require('express');
  var app = express();
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var User = require('./models/User');
  var UserCtrl = require('./controllers/UserCtrl');
  var cookieParser = require('cookie-parser');
  var session = require('express-session');

  app.use(cookieParser());
  app.use(session({
    secret: 'thisappsecret',
    resave: false,
    saveUninitialized: true
  }));

  // app.use(passport.initialize());
  // app.use(passport.session());

  //Deserializer
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //Local Login
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    console.log("passport: ", email, password)
    User.findOne({
        email: email
      })
      .then(function(user) {
        console.log("found user: ", user);
        if (!user) {
          return done(null, false);
          console.log('no user');
        }
        user.comparePassword(password).then(function(isMatch) {
          if (!isMatch) {
            console.log('no match');
            return done(null, false);
          }
          console.log("password matched: ", isMatch);
          return done(null, user);
        });
      });
  }));

  //Authorization
  var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(403).send({
        message: "Not logged in."
      }).end();
    }
    return next();
  }

  //Endpoints `/api/auth/`
  app.get('/user', requireAuth, UserCtrl.getUser);
  app.post('/user', UserCtrl.createUser);
  app.get('/', requireAuth, UserCtrl.checkLoggedIn);
  app.get('/logout', function(req, res) {
    req.logout();
    res.status(200).redirect('/');
  });

  app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      console.log("passport got here");
      // res.redirect('/users/' + req.user.username);
      res.status(200).json(req.user).end();
    });

  return app;
}();
