const Build = require('../models/build.js');

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
