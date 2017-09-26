const UsersController = require('../controllers/user.js');
const PostsController = require('../controllers/post.js');
const express = require('express');
const router = express.Router();

router.get('/', PostsController.list);
router.post('/', PostsController.create);
router.post('/:id', PostsController.comment);
router.get('/:id', PostsController.detail);
router.put('/:id', PostsController.update);
router.delete('/:id', PostsController.delete);
router.post('/:id/upvote', PostsController.upvote);
//router.post('/:id/downvote', PostsController.downvote);

module.exports = router;
