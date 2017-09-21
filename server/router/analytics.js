const router = require('express').Router();
const passport = require('passport');
const logger = require('../logger');

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/analytics', requireAuth, (req, res) => {
  logger[req.body.type](req.body);
  res.send('OK');
});

module.exports = router;
