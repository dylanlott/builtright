const bunyanMongoDbLogger = require('bunyan-mongodb-logger');
const pkg = require('./package.json');

const logger = bunyanMongoDbLogger({
  name: pkg.name,
  streams: ['stdout', 'mongodb'],
  url: process.env.DATABASE_URI,
  level: process.env.LOG_LEVEL || 'debug'
});

module.exports = logger;
