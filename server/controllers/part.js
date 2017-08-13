const Part = require('../models/part.js');

exports.createPart = (req, res) => {
  const part = new Part(req.body);
  part.save()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
};

exports.listParts = (req, res) => Part.find(req.params)
  .limit(req.body.limit || 50)
  .skip(req.body.skip || 0)
  .populate('_user')
  .then((data) => {
    console.log('List Parts; ', data);
    return res.status(200).json(data);
  });

exports.getPart = (req, res) => Part.findById(req.params.id)
  .populate('_user')
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err));

exports.updatePart = (req, res) => {
  const newPart = req.body;
  newPart.updated = Date.now();
  Part.findByIdAndUpdate(req.params.id, newPart, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};

exports.deletePart = (req, res) => Part.findByIdAndRemove(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).send(err));

