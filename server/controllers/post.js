const _ = require('lodash');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const utils = require('../utils/votes');
const log = require('../logger');

exports.create = (req, res) => {
  const post = new Post(req.body);
  post._user = req.user;
  post.save()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
};

exports.list = (req, res) => Post.find(req.query)
  .limit(req.query.limit || 50)
  .skip(req.query.skip || 0)
  .populate('_user')
  .then((data) => {
    return res.status(200).json(data);
  });

exports.detail = (req, res) => {
  return Post.findOne({ slug: req.params.id })
    .populate('_user _comments _parts')
    .then(data => {
      if (!data) {
        return Post.findById(req.params.id)
          .populate('_user _comments')
          .then(data => res.status(200).json(data))
      }

      return res.status(200).json(data)
    })
    .catch(err => res.status(500).json(err));
}

exports.update = (req, res) => {
  const newPost = req.body;
  newPost.updated = Date.now();
  Post.findByIdAndUpdate(req.params.id, newPost, (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).send(data);
  });
};

exports.delete = (req, res) => Post.findByIdAndRemove(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).send(err));

exports.search = (req, res) => Post.search(req.params.name, (err, docs) => {
  if (err) res.status(500).send(err);
  return res.status(200).send(docs);
});

exports.comment = (req, res) => {
  const newComment = new Comment(req.body.comment);
  newComment._user = req.user._id;
  newComment._parent = req.params.id;

  return newComment.save()
    .then((comment) => {
      return Post.findOne({ _id: req.params.id })
        .then((post) => {
          post._comments.push(comment._id);
          return post.save()
            .then((updatedPost) => res.status(200).send(updatedPost))
        });
    })
    .catch((err) => {
      log.error('error commenting on post', err);
      res.status(500).send('error adding comment to post');
    })
};

exports.upvote = (req, res) => {
  return Post.findById(req.params.id)
    .then(post => {
      utils.upvote(post, req.user._id);
      return post.save()
        .then(post => res.status(201).json(post));
    })
    .catch(err => {
      log.error('Error upvoting post', err);
      return res.status(500).send('error upvoting post');
    });
}

exports.downvote = (req, res) => {
  return Post.findById(req.params.id)
    .then(post => {
      utils.downvote(post, req.user._id);
      return post.save()
        .then(post => res.status(201).json(post));
    })
    .catch(err => {
      log.error('error upvoting post: ', err)
      return res.status(500).send('error downvoting post');
    });
}
