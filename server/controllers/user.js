const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
  const userId = req.params.userId;

  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({ user: userToReturn });
  });
};

exports.list = (req, res) => {
  User.find()
    .skip(req.query.skip || 50)
    .limit(req.query.limit || 50)
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send(err));
}

exports.detail = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(500).send(err);
    if (!user) {
      User.find({ email: req.params.id })
        .then(user => {
          if (!user) {
            res.status(404).send({ message: "user does not exist" })
          }

          res.status(200).json(user);
        })
        .catch(err => res.status(500).send(err));
    }
  })
}
