const bunyanLumberjack = require('bunyan-lumberjack');
const bunyan = require('bunyan');
const bunyanMongoDbLogger = require('bunyan-mongodb-logger');
const pkg = require('./package.json');

const logger = bunyanMongoDbLogger({
  name: pkg.name,
  streams: ['stdout', 'mongodb'],
  url: 'mongodb://localhost:27017/battlestations',
  level: process.env.LOG_LEVEL || 'debug'
});

module.exports = logger;
