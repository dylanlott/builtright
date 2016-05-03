var Build = require('../models/Build.js'); 
// var Util = require('Utilities.js'); 

module.exports = {

  create: function(req, res){
    console.log("Create Build activated.", req.body); 
    var newBuild = new Build(req.body); 
    newBuild.owner = req.user._id; 
    newBuild.save(function(err, data){
      console.log("create build: ", data); 
      if(err){
        res.status(500).send(err).end(); 
      }else{
        res.status(200).json(data).end(); 
      }
    }); 
  },

  getAll: function(req, res){
    console.log("get all builds: ", req.user); 
    Build 
      .find({ owner: req.user._id })
      .exec()
      .then(function(data){
        console.log("get all builds: ", data); 
        res.status(200).json(data).end(); 
      })
      .catch(function(err){
        res.status(500).send(err).end(); 
      })
  },

  getOne: function(req, res) {
    Build
      .findById(req.params.id)
      .then(function(data){
        console.log("get One build: ", data); 
        res.status(200).json(data).end(); 
      })
      .catch(function(err){
        res.status(500).send(err).end();
      })
  },

  delete: function(req, res) {
    Build 
      .findByIdAndRemove(req.params.id)
      .then(function(data){
        console.log("delete build: ", data)
      })
      .catch(function(err){
        res.status(500).send(err).end(); 
      })
  },

  addComment: function(req, res){
    Build
      .findOne({_id: req.params.id}, function(err, build){
        console.log("add comment, find build: ", build); 
        build.comments.push({
          body: req.body.body, 
          user: req.user._id
        })
        build.save(function(err, data){
          if(err){
            console.log("Error adding comment: ", err); 
            res.status(500).send("error: can't add comment.").end(); 
          }else{
            res.status(200).json(data).end(); 
          }
        })
      }); 
  },

  addPart: function(req, res){
    Build
      .findOne({_id: req.params.id}, function(err, build){
        console.log("add part to build: ", build); 
        build.parts.push({
          name: req.body.name, 
          url: req.body.url, 
          price: req.body.price
        }); 
        build.save(function(err, data){
          if(err){
            console.log("Error adding part: ", err); 
            res.status(500).send(err).end(); 
          }else{
            res.status(200).json(data).end(); 
          }
        })
      }); 
  },

  /*

  TODO: Finish delete comment endpoint 
  
  deleteComment: function(req, res){
    Build
      .findOne({ _id: req.params.id}, function(err, build){
        //loop through build comments, 

        //tick counter 

        //array.splice(x, 1); 

        //res.send(200).json(build).end(); 
      })
  }
  */

}