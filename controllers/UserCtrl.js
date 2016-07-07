var User = require('../models/User.js');

module.exports = {

  createUser: function(req, res) {
    User.findOne({ email: req.body.email })
      .exec()
      .then(function(user) {
        //if we found a user, it's a duplicate
        if (user) {
          return res.status(409).json({ message: "User with that email already exists.", email: user }).end();
        }
        //if the user's password is too short ...
        if (req.body.password.length <= 4) {
          return res.status(400).json({ message: "Your password must be longer than 4 characters." });
        }
        //otherwise, create the user
        var user = new User(req.body);
        console.log("creating new user");
        user.save(function(err, new_user) {
          if (err) {
            console.log("can't create user", err);
          }
          res.json(new_user);
        })
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
      res.status(403).json({ "status": "403", "message": "Unauthorized" }).end();
    }

  }

}
