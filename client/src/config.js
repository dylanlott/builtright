export default {
  PORT: 3000,
  API_URL: process.env.NODE_ENV === 'production'
    ? 'https://api.builtrightapp.com'
    : 'http://localhost:3000'
}
