module.exports = {
  host: 'localhost:3000',
  dashboard: '/dashboard',
  // Secret key for JWT signing and encryption
  secret: process.env.JWT_SECRET || 'super secret passphrase',
  // Database connection information
  database: process.env.DATABASE_URI || 'mongodb://localhost:27017/builtright',
  // Setting port for server
  port: process.env.PORT || 3000,
  // Configuring Mailgun API for sending transactional email
  mailgun_priv_key: process.env.MAILGUN_PRIV_KEY || 'mailgun private key here',
  // Configuring Mailgun domain for sending transactional email
  mailgun_domain: process.env.MAILGUN_DOMAIN || 'https://builtrightapp.com',
  // Mailchimp API key
  mailchimpApiKey: 'mailchimp api key here',
  // SendGrid API key
  sendgridApiKey: 'sendgrid api key here',
  // Stripe API key
  stripeApiKey: 'stripe api key goes here',
  // necessary in order to run tests in parallel of the main app
  test_port: 3001,
  test_db: 'builtright_test_db',
  test_env: 'test',
  logLevel: 'debug'
}
