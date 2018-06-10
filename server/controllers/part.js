const Part = require('../models/part.js');
const Comment = require('../models/comment.js');
const log = require('../logger');

Part.createMapping((err, mapping) => {
  if (err) {
    log.error('error creating mapping', err);
  } else {
    log.info('mapping created', mapping);
  }
})

exports.createPart = (req, res) => {
  const part = new Part(req.body);
  part.save()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
};

exports.listParts = (req, res) => Part.find(req.query)
  .limit(req.body.limit || 50)
  .skip(req.body.skip || 0)
  .populate('_user _comments')
  .then((data) => {
    return res.status(200).json(data);
  });

exports.getPart = (req, res) => {
  return Part.findOne({ slug: req.params.id })
    .populate('_user _comments')
    .then((part) => {
      if (!part) {
        return Part.findById(req.params.id)
          .populate('_user _comments', '-_user.password')
          .then(idPart => res.status(200).json(idPart))
      }

      return res.status(200).send(part)
    })
    .catch((err) => res.status(500).send(err))
};


exports.updatePart = (req, res) => {
  const newPart = req.body;
  newPart.updated = Date.now();
  Part.findByIdAndUpdate(req.params.id, newPart, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};

exports.addComment = (req, res) => {
  const newComment = new Comment(req.body.comment)
  return newComment.save()
    .then((comment) => {
      return Part.findOne({ _id: req.params.id })
        .then((part) => {
          part._comments.push(comment._id)
          return part.save().then((part) => res.status(201).json(part));
        })
    })
    .catch(err => res.status(500).send(err))
}

exports.deletePart = (req, res) => Part.findByIdAndRemove(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).send(err));

exports.search = (req, res) => {
  Part.search({
    "simple_query_string": {
      "query": req.query.keywords
    }
  }, {
    hydrate: true,
    hydrateWithESResults: true
  }, function (err, results) {
    if (err) {
      log.debug('Error searching parts: ', err)
      return res.status(400).send(err)
    }
    return res.json(results)
  })
}
