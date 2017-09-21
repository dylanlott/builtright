const log = require('./logger');
const config = require('./config/main');

const visitorsData = {};

// get the total number of users on each page of our site
function computePageCounts() {
  // sample data in pageCounts object:
  // { "/": 13, "/about": 5 }
  const pageCounts = {};
  for (const key in visitorsData) {
    const page = visitorsData[key].page;
    if (page in pageCounts) {
      pageCounts[page] + 1;
    } else {
      pageCounts[page] = 1;
    }
  }
  return pageCounts;
}

// get the total number of users per referring site
function computeRefererCounts() {
  // sample data in referrerCounts object:
  // { "http://twitter.com/": 3, "http://stackoverflow.com/": 6 }
  const referrerCounts = {};
  for (const key in visitorsData) {
    const referringSite = visitorsData[key].referringSite || '(direct)';
    if (referringSite in referrerCounts) {
      referrerCounts[referringSite] + 1;
    } else {
      referrerCounts[referringSite] = 1;
    }
  }
  return referrerCounts;
}

// get the total active users on our site
function getActiveUsers() {
  return Object.keys(visitorsData).length;
}

// wrapper function to compute the stats and return a object with the updated stats
function computeStats() {
  return {
    pages: computePageCounts(),
    referrers: computeRefererCounts(),
    activeUsers: getActiveUsers()
  };
}

exports = module.exports = function (io) {
  // Set socket.io listeners.
  io.on('connection', (socket) => {
    if (socket.handshake.headers.host === config.host
      && socket.handshake.headers.referer.indexOf(config.host + config.dashboard) > -1) {
      // if someone visits '/dashboard' send them the computed visitor data
      io.emit('updated-stats', computeStats());
    }
    // a user has visited our page - add them to the visitorsData object
    socket.on('visitor-data', (data) => {
      visitorsData[socket.id] = data;
      // compute and send visitor data to the dashboard when a new user visits our page
      io.emit('updated-stats', computeStats());
    });
    socket.on('disconnect', () => {
      // a user has left our page - remove them from the visitorsData object
      delete visitorsData[socket.id];
      io.emit('updated-stats', computeStats());
    });

    log.info('user connected');

    socket.on('visitor', (data) => {
      visitorsData[socket.id] = data;
    });
    // On conversation entry, join broadcast channel
    socket.on('enter conversation', (conversation) => {
      socket.join(conversation);
      log.info(`joined conversation ${conversation}`);
    });

    socket.on('leave conversation', (conversation) => {
      socket.leave(conversation);
      log.info(`left conversation ${conversation}`);
    });

    socket.on('new message', (conversation) => {
      log.info(`new message ${conversation}`);
      io.sockets.in(conversation).emit('refresh messages', conversation);
    });

    socket.on('disconnect', () => {
      log.info('user disconnected');
      delete visitorsData[socket.id];
    });
  });
};
