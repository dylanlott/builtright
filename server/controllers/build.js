const Build = require('../models/build.js');
const Comment = require('../models/comment.js');
const Part = require('../models/part.js');

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

exports.detail = (req, res) => {
  return Build.findById(req.params.id)
    .populate('_user _comments _parts')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
}

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
};

exports.addPart = (req, res) => {
  const part = new Part(req.body)
  return part.save()
    .then(part => {
      Build.findById(req.params.id)
        .then((build) => {
          console.log('found build: ', build);
          build._parts.push(part._id)
          build.save()
            .then((build) => {
              res.status(201).json(build);
            })
        })
    })
    .catch((err) => res.status(500).send(err));
}

exports.addExistingPart = (req, res) => {
  return Build.findById(req.params.id)
    .then((build) => {
      build._parts.push(req.body.id);
      console.log('pushed to builds parts', build);
      build.save()
        .then((build) => res.status(203).json(build))
    })
    .catch(err => res.status(500).send(err));
}
