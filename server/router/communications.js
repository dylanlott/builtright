const communications = require('../controllers/communication');
const router = require('express').Router();

router.post('/contact', communications.sendContactForm);

module.exports = router;
