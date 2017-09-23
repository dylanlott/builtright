const os = require('os');
const pkg = require('../package.json');

exports.check = function(req, res, next) {
  res.status(200).send('OK');
};

exports.info = function(req, res, next) {
  const info = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description
  }
  return res.status(200).send(info);
};
