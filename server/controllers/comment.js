const Comment = require('../models/comment.js');

exports.create = (req, res) => {
  const comment = new Comment(req.body);
  comment.save()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
};

exports.list = (req, res) => Comment.find(req.params)
  .limit(req.body.limit || 50)
  .skip(req.body.skip || 0)
  .populate('_user')
  .then((data) => {
    console.log('List Comments; ', data);
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

exports.delete = (req, res) => Comment.findByIdAndRemove(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).send(err));
