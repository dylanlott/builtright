const os = require('os');

exports.check = function(req, res, next) {
  res.status(200).send('OK');
};

exports.info = function(req, res, next) {
  const info = {
    name: 'battlestations'
  }
  res.status(200).send(info);
};
