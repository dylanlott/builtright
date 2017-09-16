const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const ChatController = require('./controllers/chat');
const CommunicationController = require('./controllers/communication');
const StripeController = require('./controllers/stripe');
const PartsController = require('./controllers/part');
const BuildsController = require('./controllers/build.js');
const CommentsController = require('./controllers/comment.js');
const HealthController = require('./controllers/health.js');
const express = require('express');
const passport = require('passport');
const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

// require in passport config
const passportService = require('./config/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    chatRoutes = express.Router(),
    payRoutes = express.Router(),
    communicationRoutes = express.Router(),
    partRoutes = express.Router(),
    commentRoutes = express.Router(),
    buildRoutes = express.Router();

  //= ========================
  // Auth Routes
  //= ========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
  authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);
  authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

  //= ========================
  // User Routes
  //= ========================

  apiRoutes.use('/user', userRoutes);
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });

  apiRoutes.get('/admins-only', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), (req, res) => {
    res.send({ content: 'Admin dashboard is working.' });
  });

  //= ========================
  // Chat Routes
  //= ========================

  apiRoutes.use('/chat', chatRoutes);

  // View messages to and from authenticated user
  chatRoutes.get('/', requireAuth, ChatController.getConversations);

  // Retrieve single conversation
  chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation);

  // Send reply in conversation
  chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply);

  // Start new conversation
  chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation);

  //= ========================
  // Payment Routes
  //= ========================
  apiRoutes.use('/pay', payRoutes);

  // Webhook endpoint for Stripe
  payRoutes.post('/webhook-notify', StripeController.webhook);

  // Create customer and subscription
  payRoutes.post('/customer', requireAuth, StripeController.createSubscription);

  // Update customer object and billing information
  payRoutes.put('/customer', requireAuth, StripeController.updateCustomerBillingInfo);

  // Delete subscription from customer
  payRoutes.delete('/subscription', requireAuth, StripeController.deleteSubscription);

  // Upgrade or downgrade subscription
  payRoutes.put('/subscription', requireAuth, StripeController.changeSubscription);

  // Fetch customer information
  payRoutes.get('/customer', requireAuth, StripeController.getCustomer);

  //= ========================
  // Communication Routes
  //= ========================
  apiRoutes.use('/communication', communicationRoutes);

  // Send email from contact form
  communicationRoutes.post('/contact', CommunicationController.sendContactForm);

  // parts
  apiRoutes.use('/parts', partRoutes);
  partRoutes.get('/', PartsController.listParts);
  partRoutes.post('/', PartsController.createPart);
  partRoutes.get('/:id', PartsController.getPart);
  partRoutes.put('/:id', PartsController.updatePart);
  partRoutes.delete('/:id', PartsController.deletePart);

  apiRoutes.use('/builds', buildRoutes);
  buildRoutes.get('/', BuildsController.list);
  buildRoutes.post('/', requireAuth, BuildsController.create);
  buildRoutes.get('/:id', BuildsController.detail);
  buildRoutes.put('/:id', requireAuth, BuildsController.update);
  buildRoutes.delete('/:id', requireAuth, BuildsController.delete);
  buildRoutes.get('/search', BuildsController.search);
  buildRoutes.post('/:id/comment', requireAuth, BuildsController.addComment);
  buildRoutes.post('/:id/new', requireAuth, BuildsController.addPart);
  buildRoutes.post('/:id/existing', requireAuth, BuildsController.addExistingPart);
  buildRoutes.post('/:id/upvote', requireAuth, BuildsController.upvote);
  buildRoutes.post('/:id/downvote', requireAuth, BuildsController.downvote);

  apiRoutes.use('/comments', commentRoutes);
  commentRoutes.get('/', CommentsController.list);
  commentRoutes.post('/', CommentsController.create);
  commentRoutes.get('/:id', CommentsController.detail);
  commentRoutes.put('/:id', CommentsController.update);
  commentRoutes.delete('/:id', CommentsController.delete);

  // health check
  apiRoutes.use('/health', HealthController.check);
  apiRoutes.use('/info', HealthController.info);

  app.use('/api', apiRoutes);
};
