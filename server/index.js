require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const socketEvents = require('./socketEvents');
const config = require('./config/main');
// const cluster = require('cluster');
// const os = require('os');
const helmet = require('helmet');
const bluebird = require('bluebird');
const log = require('./logger');

const app = express();
mongoose.Promise = bluebird;

// let server;

// function connect() {
//   if (cluster.isMaster) {
//     const numWorkers = os.cpus().length;
//     log.info(`master cluster setting up ${numWorkers} workers...`);

//     for (let i = 0; i < numWorkers; i++) {
//       cluster.fork();
//     }

//     cluster.on('online', (worker) => {
//       log.info(`worker ${worker.process.pid} is online`);
//     });

//     cluster.on('exit', (worker, code, signal) => {
//       log.error(`worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
//       log.error('starting a new worker');
//       cluster.fork();
//     });
//   } else if (process.env.NODE_ENV !== config.test_env) {
//     server = app.listen(config.port);
//     log.info(`builtright api is running on port ${config.port}.`);
//   } else {
//     server = app.listen(config.test_port);
//   }
// }

const server = app.listen(config.port);

mongoose.connect(config.database, { useMongoClient: true }, (err) => {
  if (err) log.error('error connecting to mongo: ', err);
  log.info('connected to mongoose');
  // connect();
});

const io = require('socket.io').listen(server);

socketEvents(io);

app.use(express.static(`${ __dirname }/public`));

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(helmet());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Setup admin dashboard
app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/models', // Your models directory.
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: require('mongoose') // The mongoose database connection.
}));

router(app);

module.exports = server;