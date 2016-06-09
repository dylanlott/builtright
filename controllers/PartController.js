var Part = require('../models/Part.js'); 

module.exports = {
  create: function(req, res){
    console.log("Create Part activated.", req.body); 
    var newPart = new Part(req.body); 
    newPart.owner = req.user._id; 
    newPart.save(function(err, data){
      console.log("create part: ", data); 
      if(err){
        res.status(500).sendMessage(err).end(); 
      }else{
        res.status(200).json(data).end(); 
      }
    })
  }, 

  getAll: function(req, res){
    console.log("get All Parts for: ", req.user); 
    Part
      .find({ owner: req.user._id })
      .exec()
      .then(function(data){
        console.log("getAll Parts: ", data); 
        res.status(200).json(data).end(); 
      })
      .catch(function(err){
        res.status(500).sendMessage(err).end(); 
      })
  },

  getOne: function(req, res){
    Part
      .findById(req.params.id)
      .then(function(data){
        console.log("get one part: ", data); 
        res.status(200).json(data).end(); 
      })
      .catch(function(err){
        res.status(500).sendMessage(err).end(); 
      })
  }, 

  delete: function(req, res){
    Part
      .findByIdAndRemove(req.params.id)
      .then(function(data){
        console.log("deleted part: ", data); 
        res.status(200).json(data).end(); 
      })
      .catch(function(err){
        res.status(500).sendMessage(err).end(); 
      })
  }
}