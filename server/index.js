const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const socketEvents = require('./socketEvents');
const config = require('./config/main');
const cluster = require('cluster');
const os = require('os');
const helmet = require('helmet');
const bluebird = require('bluebird');

const app = express();
mongoose.Promise = bluebird;

let server;

function connect() {
  if (cluster.isMaster) {
    const numWorkers = os.cpus().length;

    console.log(`master cluster setting up ${numWorkers} workers...`);

    for (let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }

    cluster.on('online', (worker) => {
      console.log(`worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
      console.log('starting a new worker');
      cluster.fork();
    });
  } else if (process.env.NODE_ENV !== config.test_env) {
    server = app.listen(config.port);
    console.log(`battlestations api is running on port ${config.port}.`);
  } else {
    server = app.listen(config.test_port);
  }
}

mongoose.connect(config.database, { useMongoClient: true }, (err) => {
  if (err) console.log('error connecting to mongo: ', err);
  console.log('connected to Mongoose');
  connect();
});

const io = require('socket.io').listen(server);

socketEvents(io);

// Set static file location for production
app.use(express.static(`${__dirname  }/public`));

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(helmet());
// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Import routes to be served
router(app);

// necessary for testing
module.exports = server;
