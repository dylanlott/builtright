const config = require('./config/main');
const visitorsData = {};
const log = require('./logger');

function computePageCounts() {
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

function computeRefererCounts() {
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

function getActiveUsers() {
  return Object.keys(visitorsData).length;
}

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
    log.info('new connection');
    if (socket.handshake.headers.host === config.host
      && socket.handshake.headers.referer.indexOf(config.host + config.dashboard) > -1) {
        log.info('user connected', socket);
        io.emit('updated-stats', computeStats());
    }

    socket.on('visitor-data', (data) => {
      visitorsData[socket.id] = data;
      io.emit('updated-stats', computeStats());
    });

    socket.on('disconnect', () => {
      delete visitorsData[socket.id];
      log.info('user disconnected');
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
      log.info('socket disconnected');
      delete visitorsData[socket.id];
    });
  });
};
