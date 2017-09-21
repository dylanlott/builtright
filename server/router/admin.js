const router = require('express').Router();
const passport = require('passport');
const constants = require('../constants');
const AuthenticationController = require('../controllers/authentication');

const ROLE_ADMIN = constants.ROLE_ADMIN;
const requireAuth = passport.authenticate('jwt', { session: false });
const requireAdmin = AuthenticationController.roleAuthorization;

router.post('/', requireAuth, requireAdmin(ROLE_ADMIN), (req, res) => {
  res.send({ content: 'Admin dashboard is working.' });
});

router.get('/stats', requireAuth, requireAdmin(ROLE_ADMIN), (req, res) => {
  res.send('OK');
});

module.exports = router;
