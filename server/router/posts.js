const express = require('express');
const passport = require('passport');
const router = express.Router();

const UsersController = require('../controllers/user.js');
const PostsController = require('../controllers/post.js');
const constants = require('../constants');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/', PostsController.list);
router.get('/count', PostsController.count);
router.get('/search', PostsController.search);
router.post('/', requireAuth, PostsController.create);
router.post('/:id/comment', requireAuth, PostsController.comment);
router.get('/:id', PostsController.detail);
router.put('/:id', requireAuth, PostsController.update);
router.delete('/:id', requireAuth, PostsController.delete);
router.post('/:id/upvote', requireAuth, PostsController.upvote);
router.post('/:id/downvote', requireAuth, PostsController.downvote);

module.exports = router;
