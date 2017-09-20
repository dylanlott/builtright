const comments = require('../controllers/comment');
const router = require('express').Router();
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/', comments.list);
router.post('/', comments.create);
router.get('/:id', comments.detail);
router.put('/:id', comments.update);
router.post('/:id/upvote', comments.upvote);
router.post('/:id/downvote', comments.downvote);
router.delete('/:id', comments.delete);

module.exports = router;
