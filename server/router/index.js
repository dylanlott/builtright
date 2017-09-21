const express = require('express');
const passport = require('passport');
const logger = require('../logger');
const constants = require('../constants');
const AuthenticationController = require('../controllers/authentication');
const UserController = require('../controllers/user');
const ChatController = require('../controllers/chat');
const CommunicationController = require('../controllers/communication');
const StripeController = require('../controllers/stripe');
const PartsController = require('../controllers/part');
const BuildsController = require('../controllers/build.js');
const CommentsController = require('../controllers/comment.js');
const HealthController = require('../controllers/health.js');

module.exports = function (app) {
  const api = express.Router();

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
  api.use('/info', HealthController.info);

  app.use('/api', api);
};
