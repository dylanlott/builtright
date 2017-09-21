const router = require('express').Router();
const passport = require('passport');

const auth = require('../controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.post('/register', auth.register);
router.post('/login', requireLogin, auth.login);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password/:token', auth.verifyToken);

module.exports = router;
