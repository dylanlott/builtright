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
  const stats = {
    pages: computePageCounts(),
    referrers: computeRefererCounts(),
    activeUsers: getActiveUsers()
  };

  return stats;
}

exports = module.exports = (io) => {
  io.on('connection', (socket) => {
    if (socket.handshake.headers.host === config.host
      && socket.handshake.headers.referer.indexOf(config.host + config.dashboard) > -1) {
      io.emit('updated-stats', computeStats());
    }

    socket.on('visitor-data', (data) => {
      visitorsData[socket.id] = data;
      io.emit('updated-stats', computeStats());
    });

    socket.on('disconnect', () => {
      delete visitorsData[socket.id];
      io.emit('updated-stats', computeStats());
    });

    socket.on('visitor-data', (data) => {
      visitorsData[socket.id] = data;
    });

    socket.on('enter conversation', (conversation) => {
      socket.join(conversation);
    });

    socket.on('leave conversation', (conversation) => {
      socket.leave(conversation);
    });

    socket.on('new message', (conversation) => {
      io.sockets.in(conversation).emit('refresh messages', conversation);
    });

    socket.on('disconnect', () => {
      delete visitorsData[socket.id];
    });
  });
};
