const router = require('express').Router();
const passport = require('passport');
const user = require('../controllers/user');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, user.list);
router.get('/count', user.count);
router.get('/:id', requireAuth, user.detail);

module.exports = router;
