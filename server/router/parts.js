const router = require('express').Router();
const passport = require('passport');
const parts = require('../controllers/part');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/', parts.listParts);
router.post('/', parts.createPart);
router.get('/:id', parts.getPart);
router.put('/:id', parts.updatePart);
router.delete('/:id', parts.deletePart);

module.exports = router;
