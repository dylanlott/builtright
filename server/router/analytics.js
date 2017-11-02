const router = require('express').Router();
const passport = require('passport');
const logger = require('../logger');

const requireAuth = passport.authenticate('jwt', { session: false });

/*
 * Create Analytics Event
 *
 * @params    req.body.type - can be error, warn, info, or debug
 * @params    req.body.message - message of the log statement
 * @params    req.body - object that can contain any data that the client sends
 */
router.post('/analytics', requireAuth, (req, res) => {
  logger[req.body.type](req.body.message, req.body);
  return res.status(201).send('OK');
});

module.exports = router;
