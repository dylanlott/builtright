const AuthenticationController = require('../controllers/authentication');
const UserController = require('../controllers/user');
const ChatController = require('../controllers/chat');
const CommunicationController = require('../controllers/communication');
const StripeController = require('../controllers/stripe');
const PartsController = require('../controllers/part');
const BuildsController = require('../controllers/build.js');
const CommentsController = require('../controllers/comment.js');
const HealthController = require('../controllers/health.js');
const express = require('express');
const passport = require('passport');
const constants = require('../constants');

const ROLE_MEMBER = constants.ROLE_MEMBER;
const ROLE_CLIENT = constants.ROLE_CLIENT;
const ROLE_OWNER = constants.ROLE_OWNER;
const ROLE_ADMIN = constants.ROLE_ADMIN;

// require in passport config
const passportService = require('../config/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  const api = express.Router();

  api.get('/admin', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), (req, res) => {
    res.send({ content: 'Admin dashboard is working.' });
  });

  api.use('/auth', require('./auth'));
  api.use('/user', require('./users'));
  api.use('/chat', require('./chats'));
  api.use('/pay', require('./payments'));
  api.use('/communication', require('./communications'));
  api.use('/parts', require('./parts'));
  api.use('/builds', require('./builds'));
  api.use('/comments', require('./comments'));
  api.use('/posts', require('./posts'));
  api.use('/health', HealthController.check);
  api.use('/info', HealthController.info);

  app.use('/api', api);
};
