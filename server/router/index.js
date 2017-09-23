const api = require('express').Router();
const HealthController = require('../controllers/health.js');

module.exports = function (app) {
  api.use('/analytics', require('./analytics'));
  api.use('/admin', require('./admin'));
  api.use('/auth', require('./auth'));
  api.use('/users', require('./users'));
  api.use('/chats', require('./chats'));
  api.use('/payments', require('./payments'));
  api.use('/communication', require('./communications'));
  api.use('/parts', require('./parts'));
  api.use('/builds', require('./builds'));
  api.use('/comments', require('./comments'));
  api.use('/posts', require('./posts'));
  api.use('/health', HealthController.check);
  api.get('/', HealthController.info);
  app.use('/api', api);
};
