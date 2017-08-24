const Build = require('../models/build.js');
const Comment = require('../models/comment.js');

exports.create = (req, res) => {
  const build = new Build(req.body);
  build.save()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
};

exports.list = (req, res) => Build.find(req.params)
  .limit(req.body.limit || 50)
  .skip(req.body.skip || 0)
  .populate('_user')
  .then((data) => {
    console.log('List Builds: ', data);
    return res.status(200).json(data);
  });

exports.detail = (req, res) => Build.findById(req.params.id)
  .populate('_user')
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err));

exports.update = (req, res) => {
  const newBuild = req.body;
  newBuild.updated = Date.now();
  Build.findByIdAndUpdate(req.params.id, newBuild, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};

exports.delete = (req, res) => Build.findByIdAndRemove(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).send(err));

exports.search = (req, res) => Build.search(req.params.name, (err, docs) => {
  if (err) res.status(500).send(err);
  return res.status(200).send(docs);
});

exports.addComment = (req, res) => {
  const newComment = new Comment(req.body);
  newComment._parent = req.params.id;

  newComment.save((err, comment) => {
    console.log('comment: ', comment);

    Build.findById(req.params.id, (error, build) => {
      build._comments.push(comment._id);
      build.save((saveError, updatedBuild) => {
        if (err) {
          res.status(500).send(saveError);
        }
        return res.status(200).send(updatedBuild);
      });
    });
  });

  
  // Build.findByIdAndUpdate(req.params.id, { $push: { _comments: req.body._id } }, (err, comment) => {
  //   console.log('err: ', err);
  //   console.log('comment: ', comment);

  //   if (err) res.status(500).send(err);

  //   return res.status(200).send(comment);
  // });
};
