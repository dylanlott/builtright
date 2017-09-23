const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
  if (req.user._id.toString() !== req.params.userId) {
    return res.status(401).json({
      error: 'You are not authorized to view this user profile'
    });
  }

  return User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({ user: userToReturn });
  });
};

exports.list = (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (user.role === 'admin') {
      return User.find(req.query)
        .limit(req.params.limit)
        .skip(req.params.skip)
        .select('-password')
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).send(err || error));
    }

    return res.status(401).send('Unauthorized');
  });
};

exports.detail = (req, res) => {
  return User.findById(req.params.id)
    .select('-password')
    .then((user) => {
      if (!user) {
        return User.findOne({ email: req.params.id })
          .select('-password')
          .then((found) => {
            if (!found) {
              return res.status(404).send({ message: 'user does not exist' });
            }

            return res.status(200).json(found);
          });
      }

      return res.send(user);
    })
    .catch(error => res.status(500).send(error));
};

exports.favorite = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(500).send(err);

    // push buildId to saved array
    if (user._saved.indexOf(req.body.buildId) > -1) {
      user._saved.push(req.body.buildId);
      return user.save()
        .then(savedUser => res.status(204).send(savedUser));
    }

    return res.status(200).send({ message: 'user already saved post' });
  });
};
