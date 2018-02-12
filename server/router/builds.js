const router = require('express').Router();
const builds = require('../controllers/build');
const constants = require('../constants');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/', builds.list);
router.post('/', requireAuth, builds.create);
router.get('/:id', builds.detail);
router.put('/:id', requireAuth, builds.update);
router.delete('/:id', requireAuth, builds.delete);
// router.post('/search', builds.search);
router.post('/:id/comment', requireAuth, builds.addComment);
router.post('/:id/new', requireAuth, builds.addPart);
router.post('/:id/existing', requireAuth, builds.addExistingPart);
router.post('/:id/upvote', requireAuth, builds.upvote);
router.post('/:id/downvote', requireAuth, builds.downvote);

module.exports = router;
