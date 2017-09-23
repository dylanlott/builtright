const Comment = require('../models/comment.js');
const log = require('../logger');

exports.create = (req, res) => {
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
    if (comment._votes.indexOf(req.user._id) > -1) {
      return res.status(200).send({ message: 'user has already upvoted this comment' });
    }

    comment._votes.push(req.user._id);
    return comment.save().then(updated => res.status(201).json(updated));
  })
  .catch(err => log.info('error upvoting build: ', err));

exports.downvote = (req, res) => Comment.findById(req.params.id)
  .then((comment) => {
    if (comment._votes.indexOf(req.user._id) > -1) {
      comment._votes.splice(comment._votes.indexOf(req.user._id), 1);
      comment.save()
        .then(upvoted => res.status(203).send(upvoted));
    }

    return res.status(200).send(comment);
  })
  .catch(err => res.status(500).send(err));

exports.delete = (req, res) => Comment.findByIdAndRemove(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).send(err));
