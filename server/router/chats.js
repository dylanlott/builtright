const router = require('express').Router();
const chats = require('../controllers/chat');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// View messages to and from authenticated user
router.get('/', requireAuth, chats.getConversations);

// Retrieve single conversation
router.get('/:conversationId', requireAuth, chats.getConversation);

// Send reply in conversation
router.post('/:conversationId', requireAuth, chats.sendReply);

// Start new conversation
router.post('/new/:recipient', requireAuth, chats.newConversation);

module.exports = router;
