const _ = require('lodash');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');

exports.create = (req, res) => {
  const post = new Post(req.body);
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
      console.log('found post by slug: ', data);

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

exports.addComment = (req, res) => {
  const newComment = new Comment(req.body);
  newComment._parent = req.params.id;

  newComment.save((err, comment) => {
    console.log('comment: ', comment);

    Post.findById(req.params.id, (error, post) => {
      post._comments.push(comment._id);
      post.save((error, updatedPost) => {
        if (err || error) {
          res.status(500).send(err||error);
        }
        return res.status(200).send(updatedPost);
      });
    });
  });
};

exports.upvote = (req, res) => {
  return Post.findById(req.params.id)
    .then(post => {
      console.log('upvote post: ', post);

      if (post._upvotes.indexOf(req.user._id) > -1) {
        return res.status(200).send({ message: 'user has already upvoted this post' });
      }

      post._upvotes.push(req.user._id);
      post.save().then(updated => res.status(201).json(updated))
    })
    .catch(err => console.log('error upvoting post: ', err));
}

//TODO: add downvote functionality
//exports.downvote = (req, res) => {
//  return Build.findById(req.params.id)
//    .then(build => {
//      console.log('downvote build: ', build);
//      console.log('user downvoting: ', req.user._id);
//
//      if (build._votes.indexOf(req.user._id) > -1) {
//        build._votes.splice(build._votes.indexOf(req.user._id), 1);
//        console.log('build._votes: ', build._votes);
//        build.save()
//          .then(upvoted => res.status(203).send(upvoted));
//      }
//
//      return res.status(200).send(build);
//    })
//    .catch(err => res.status(500).send(err));
//}
