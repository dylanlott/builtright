module.exports = function(){
  var express = require('express');
  var app = express();
  var Build = require('../controllers/BuildController.js'); 

  app.get('/', Build.getAll);
  app.get('/:id', Build.getOne); 
  app.post('/', Build.create); 
  app.delete('/:id', Build.delete);
  // app.put('/:id', Build.update); Not tested yet 
  app.post('/comment/:id', Build.addComment); 
  app.post('/parts/:id', Build.addPart); 
  
  return app;

}();