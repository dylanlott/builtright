const _ = require('lodash');
const moment = require('moment');
const Build = require('../models/build.js');
const Comment = require('../models/comment.js');
const Part = require('../models/part.js');
const vote = require('../utils/votes');
const log = require('../logger');
const slug = require('slug');

Build.createMapping((err, mapping) => {
  if (err) {
    log.error('error creating mapping, you can ignore this', err);
  } else {
    log.info('mapping created', mapping);
  }
});

exports.create = (req, res) => {
  console.log('CREATING BUILD', req.body)
  const build = new Build(req.body);
  build.save()
    .then(data => {
      build.on('es-indexed', (err, data) => {
        if (err) log.error('error indexing build', err);
        return log.info('build indexed', data);
      });

      log.info('build created', data);
      return res.status(201).json(data)
    })
    .catch(err => {
      log.error('error creating build', err);
      return res.status(500).json(err);
    });
};

exports.list = (req, res) => {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 50
  const sort = parseInt(req.query.sort) || -1
  const year = moment().year()
  const maxYear = parseInt(req.query.maxYear) || year
  const minYear = parseInt(req.query.minYear) || 0

  return Build.find()
    .populate('_user', '-password')
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).send(err));
}

exports.detail = (req, res) => {
  return Build.findOne({ slug: req.params.id })
    .populate('_user _comments _parts', '-password')
    .then(data => {
      if (!data) {
        return Build.findById(req.params.id)
          .populate('_user _comments _parts', '-password')
          .then(data => res.status(200).json(data))
      }

      return res.status(200).json(data)
    })
    .catch(err => res.status(500).json(err));
};

exports.update = (req, res) => {
  const newBuild = req.body;
  newBuild.updated = Date.now();
  newBuild.slug = slug(req.body.title, { lower: true })
  Build.findByIdAndUpdate(req.params.id, newBuild, (err, data) => {
    if (err) {
      log.error('error updating build', err);
      return res.status(500).json(err);
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

exports.search = (req, res) => {
  return Build.search({
      query_string: { query: req.body.terms },
    },
    { hydrate: true },
    (err, results) => {
      if (err) {
        log.error('error searching builds', err);
        return res.status(500).send('error querying results');
      }
    return res.status(200).json(results);
  })
}

exports.addComment = (req, res) => {
  const newComment = new Comment(req.body.comment);
  return newComment.save((err, comment) => {
    if (err) return res.status(500).send('error adding comment', err)

    return Build.findById(req.params.id, (error, build) => {
      build._comments.push(comment._id);
      build.save((saveError, updatedBuild) => {
        if (saveError) {
          log.error('error saving build after adding comment', err)
          return res.status(500).send(saveError);
        }
        return res.status(200).send(updatedBuild);
      });
    });
  });
};

// create a new Part and add it to the build
exports.addPart = (req, res) => {
  const _part = new Part(req.body)
  return _part.save()
    .then(part => {
      Build.findById(req.params.id)
        .then((build) => {
          build._parts.push(part._id)
          build.save()
            .then((build) => {
              log.info('added part to build', part, build);
              return res.status(201).json({
                build,
                part
              });
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
    .catch(err => {
      log.error('error adding existing part', err);
      return res.status(500).send(err);
    });
}

exports.upload = (req, res) => {
  return Build.findById(req.params.id)
    .then((build) => {
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
      vote.upvote(build, req.user._id);
      return build.save()
        .then(updated => {
          log.info('upvoted build', build._id);
          return res.status(201).json(updated)
        })
    })
    .catch(err => logger.error('Error upvoting post', err));
}

exports.downvote = (req, res) => {
  return Build.findById(req.params.id)
    .then(build => {
      vote.downvote(build, req.user._id);
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

exports.search = (req, res) => {
  Build.search({
    // query_string: {
    //   query: req.query.keywords
    // }
    "simple_query_string": {
      "query": req.query.keywords
    }
  },
  {
    hydrate: true,
    hydrateWithESResults: true
  }, function (err, results) {
    if (err) {
      log.debug('ERROR: ', err)
      return res.send(err)
    }
    return res.json(results)
  })
}

exports.count = (req, res) => {
  Build.count({}, (err, count) => {
    if (err) {
      log.error('error getting total builds', err);
      return res.status(500).send('error getting total builds');
    }
    return res.status(200).json({ count })
  })
}
