const _ = require('lodash');
const Build = require('../models/build.js');
const Comment = require('../models/comment.js');
const Part = require('../models/part.js');
const vote = require('../utils/votes');
const log = require('../logger');

exports.create = (req, res) => {
  const build = new Build(req.body);
  build.save()
    .then(data => {
      log.info('build created', data);
      res.status(200).json(data)
    })
    .catch(err => {
      log.error('error creating build', err);
      return res.status(500).json(err);
    })
};

exports.list = (req, res) => Build.find(req.query)
  .populate('_user')
  .where('hidden').equals('false')
  .select('-password')
  .then((data) => {
    return res.status(200).json(data);
  });

exports.detail = (req, res) => {
  return Build.findOne({ slug: req.params.id })
    .populate('_user _comments _parts')
    .select('-_user.password')
    .then(data => {
      if (!data) {
        return Build.findById(req.params.id)
          .populate('_user _comments _parts')
          .select('-_user.password')
          .then(data => res.status(200).json(data))
      }

      return res.status(200).json(data)
    })
    .catch(err => res.status(500).json(err));
};

exports.update = (req, res) => {
  const newBuild = req.body;
  newBuild.updated = Date.now();
  Build.findByIdAndUpdate(req.params.id, newBuild, (err, data) => {
    if (err) {
      log.error('error updating build', err);
      res.status(500).json(err);
    }
    log.info('updated build', data);
    return res.status(200).json(data);
  });
};

exports.delete = (req, res) => Build.findByIdAndRemove(req.params.id)
  .then(data => {
    log.info('deleted build', data);
    res.status(200).json(data)
  })
  .catch(err => {
    log.error('error deleting build', err);
    res.status(500).send(err);
  })

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

// create a new Part and add it to the build
exports.addPart = (req, res) => {
  const part = new Part(req.body)
  return part.save()
    .then(part => {
      Build.findById(req.params.id)
        .then((build) => {
          build._parts.push(part._id)
          log.info('added part to build', part, build);
          build.save()
            .then((build) => {
              return res.status(201).json(build);
            })
        })
    })
    .catch((err) => {
      log.error('error adding part to build', err);
      return res.status(500).send(err);
    });
}

// for adding a part that already exists in our part database to the build
exports.addExistingPart = (req, res) => {
  Part.findById(req.body.partId, (err, part) => {
    if (err) res.status(500).send(err);

    Build.findById(req.params.id)
      .then(build => {
        if (build._parts.indexOf(req.body.partId) > -1) {
          return res.status(200).send({ message: 'part already added to build' });
        }

        build._parts.push(req.body.partId);
        return build.save().then(updated => res.status(201).json(updated))
      })
      .catch(err => res.status(500).send(err));
  })
}

exports.addExistingPart = (req, res) => {
  return Build.findById(req.params.id)
    .then((build) => {
      build._parts.push(req.body.id);
      return build.save()
        .then((build) => res.status(203).json(build))
    })
    .catch(err => res.status(500).send(err));
}

exports.upload = (req, res) => {
  return Build.findById(req.params.id)
    .then((build => {
      // upload image
      // store image in S3
      // Get URL back
      // store URL in build.images
      // send back updated build object
      return res.status(200).json({ message: 'not implemented yet' });
    })
    .catch((err) => {
      log.error('error uploading file', err);
      res.status(500).json({ message: 'error uploading file' });
    });
}

exports.upvote = (req, res) => {
  return Build.findById(req.params.id)
    .then(build => {
      vote.removeDownvote(build, req.user._id);
      vote.addUpvote(build, req.user._id);

      return build.save()
        .then(updated => res.status(201).json(updated));;
    })
    .catch(err => logger.error('Error upvoting post', err));
}

exports.downvote = (req, res) => {
  return Build.findById(req.params.id)
    .then(build => {
      vote.removeUpvote(build, req.user._id);
      vote.addDownvote(build, req.user._id);

      return build.save()
        .then(updated => {
          log.info('downvoted build', build._id);
          return res.status(203).send(updated);
        })
    })
    .catch(err => {
      log.error('error downvoting build', err);
      res.status(500).send(err)
    });
}
