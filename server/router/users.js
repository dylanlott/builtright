const router = require('express').Router();
const passport = require('passport');
const user = require('../controllers/user');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/:userId', requireAuth, user.viewProfile);

module.exports = router;
