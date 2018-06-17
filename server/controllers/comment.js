const Comment = require('../models/comment.js');
const log = require('../logger');
const vote = require('../utils/votes');

exports.create = (req, res) => {
  if (!req.body.text) {
    return res.status(400).send('incorrectly formatted comment')
  }

  if (!req.body._user) {
    return res.status(400).send('must have associated user')
  }

  const comment = new Comment(req.body);
  comment.save()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
};

exports.list = (req, res) => Comment.find(req.query)
  .populate('_user')
  .then((data) => {
    console.log('comments params: ', req.params);
    console.log('comments list: ', data);
    return res.status(200).json(data);
  });

exports.detail = (req, res) => Comment.findById(req.params.id)
  .populate('_user')
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err));

exports.update = (req, res) => {
  const newComment = req.body;
  newComment.updated = Date.now();
  Comment.findByIdAndUpdate(req.params.id, newComment, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};

exports.upvote = (req, res) => Comment.findById(req.params.id)
  .then((comment) => {
    vote.removeDownvote(comment, req.user._id);
    vote.addUpvote(comment, req.user._id);

    return comment.save().then(updated => res.status(201).json(updated));
  })
  .catch(err => log.info('error upvoting build: ', err));

exports.downvote = (req, res) => Comment.findById(req.params.id)
  .then((comment) => {
    vote.removeUpvote(comment, req.user._id);
    vote.addDownvote(comment, req.user._id);
    return res.status(200).send(comment);
  })
  .catch(err => res.status(500).send(err));

exports.delete = (req, res) => Comment.findByIdAndRemove(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).send(err));

exports.count = (req, res) => {
  Comment.count({}, (err, count) => {
    if (err) {
      log.error('error getting total comments', err);
      return res.status(500).send('error getting total builds');
    }
    return res.status(200).json({ count })
  })
}
