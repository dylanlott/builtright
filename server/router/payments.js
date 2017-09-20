const router = require('express').Router();
const stripe = require('../controllers/stripe');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Webhook endpoint for Stripe
router.post('/webhook-notify', stripe.webhook);

// Create customer and subscription
router.post('/customer', requireAuth, stripe.createSubscription);

// Update customer object and billing information
router.put('/customer', requireAuth, stripe.updateCustomerBillingInfo);

// Delete subscription from customer
router.delete('/subscription', requireAuth, stripe.deleteSubscription);

// Upgrade or downgrade subscription
router.put('/subscription', requireAuth, stripe.changeSubscription);

// Fetch customer information
router.get('/customer', requireAuth, stripe.getCustomer);

module.exports = router;
