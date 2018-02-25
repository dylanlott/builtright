const bunyanMongoDbLogger = require('bunyan-mongodb-logger');
const pkg = require('./package.json');
const config = require('./config/main');

const logger = bunyanMongoDbLogger({
  name: pkg.name,
  streams: ['stdout', 'mongodb'],
  url: config.database,
  level: config.logLevel || 'debug'
});

module.exports = logger;
