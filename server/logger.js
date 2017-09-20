const bunyanMongoDbLogger = require('bunyan-mongodb-logger');
const pkg = require('./package.json');

const logURL = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE_NAME}`;

const logger = bunyanMongoDbLogger({
  name: pkg.name,
  streams: ['stdout', 'mongodb'],
  url: logURL,
  level: process.env.LOG_LEVEL || 'debug'
});

module.exports = logger;
