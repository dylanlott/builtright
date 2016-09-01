module.exports = function(){
  var express = require('express');
  var app = express();
  var User = require('../controllers/UserCtrl.js'); 

  app.get('/all', User.getAllUsers);
  
  return app;
}();