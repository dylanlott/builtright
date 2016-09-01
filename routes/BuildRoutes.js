module.exports = function(){
  var express = require('express');
  var app = express();
  var Build = require('../controllers/BuildController.js');
  var Util = require('../controllers/Utilities.js');

  // PREFIXED BY `/api/builds`
  app.all('*', Util.requireAuth); 
  app.get('/', Build.getAll);
  app.get('/:id', Build.getOne);
  app.post('/', Build.create);
  app.delete('/:id', Build.delete);
  app.get('/:id/cost', Build.calculateCost);
  // app.put('/:id', Build.update); Not tested yet
  app.post('/comment/:id', Build.addComment);
  app.post('/parts/:id', Build.addPart);

  return app;
}();
