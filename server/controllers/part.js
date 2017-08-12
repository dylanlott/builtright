const Part = require('../models/part.js');

exports.createPart = (req, res, next) => {
  const part = new Part(req.body);
  part.save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

exports.listParts = (req, res, next) => {
  return Part.find(req.params)
    .limit(req.body.limit || 50)
    .skip(req.body.skip || 0)
    .then((data) => {
      console.log('List Parts; ', data);
      return res.status(200).json(data);
    });
};

exports.getPart = (req, res, next) => {
  return Part.findById(id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    })
};

exports.updatePart = (req, res, next) => {

};

exports.deletePart = (req, res, next) => {
  return Part.findByIdAndRemove(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).send(err));
};

