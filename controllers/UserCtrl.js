var User = require('../models/User.js');

module.exports = {

  createUser: function(req, res) {
    console.log("createUser: ", req.body);
    User
      .findOne({
        email: req.body.email
      })
      .then(function(user) {
        console.log("found user: ", user);
        if (user) {
          return res.sendStatus(409);
        }
        if (req.body.password.length <= 4) {
          return res.status(400).json({
            message: "Your password must be longer than 4 characters."
          });
        }
        var newUser = new User(req.body);
        console.log("creating new user", newUser);
        newUser.save(function(err, new_user) {
          if (err) {
            console.log("can't create user", err);
          }
          res.status(201).json(new_user).end();
        })

        newUser.save()
          .then(function(user) {
            console.log("user created: ", user);
          })
      })
      .catch(function(err){
        consoe.log(err);
        throw new Error(err);  
      })
  },

  getAllUsers: function(req, res) {
    console.log("get all users activated");
    User.find({}, function(err, users) {
      if (err) {
        console.log("Error getting users. ", err);
        return res.status(500).end();
      } else {
        res.status(200).json(users);
      }

    })
  },

  getUser: function(req, res) {
    console.log("getUser activated");
    res.status(200).json(req.user).end();
  },

  checkLoggedIn: function(req, res) {
    if (req.user) {
      res.status(200).json(req.user._id).end();
    } else {
      res.status(403).json({
        "status": "403",
        "message": "Unauthorized. Please login to continue."
      }).end();
    }

  }

}
