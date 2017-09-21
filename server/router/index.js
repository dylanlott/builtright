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

const ROLE_MEMBER = constants.ROLE_MEMBER;
const ROLE_CLIENT = constants.ROLE_CLIENT;
const ROLE_OWNER = constants.ROLE_OWNER;
const ROLE_ADMIN = constants.ROLE_ADMIN;

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  const api = express.Router();


  api.post('/analytics', requireAuth, (req,res) => {
    logger[req.body.type](req.body);
    res.send('OK');
  });

  api.use('/admin', require('./admin'));
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
