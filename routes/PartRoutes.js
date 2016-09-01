module.exports = function(){
  var express = require('express');
  var app = express();
  var Part = require('../controllers/PartController.js');
  var Util = require('../controllers/Utilities.js'); 

  app.get('/', Util.requireAuth, Part.getAll);
  app.get('/:id', Util.requireAuth, Part.getOne); 
  app.post('/', Util.requireAuth, Part.create); 
  app.delete('/:id', Util.requireAuth, Part.delete);
  // app.put('/:id', Part.update); Not tested yet 

  return app;
}();