const router = require('express').Router();
const passport = require('passport');
const constants = require('../constants');
const AuthenticationController = require('../controllers/authentication');

const ROLE_ADMIN = constants.ROLE_ADMIN;
const requireAuth = passport.authenticate('jwt', { session: false });
const role = AuthenticationController.roleAuthorization;

router.post('/', requireAuth, role(ROLE_ADMIN), (req, res) => {
  return res.send({ content: 'Admin dashboard is working.' });
});

router.get('/stats', requireAuth, role(ROLE_ADMIN), (req, res) => {
  return res.send('OK');
});

router.get('/users', requireAuth, role(ROLE_ADMIN), (req, res) => {
  return res.status(200).send('route not implemented yet');
});

router.get('/users/:id', requireAuth, role(ROLE_ADMIN), (req, res) => {
  return res.status(200).send('get user details route not implemented yet');
});

router.put('/users/:id', requireAuth, role(ROLE_ADMIN), (req, res) => {
  return res.status(200).send('edit user not implemented yet');
});

router.delete('/users/:id', requireAuth, role(ROLE_ADMIN), (req, res) => {
  return res.status(200).send('delete user not implemented yet');
});

module.exports = router;
