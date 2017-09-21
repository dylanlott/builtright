export default {
  API_URL: process.NODE_ENV === 'production'
    ? 'https://localhost:3000'
    : 'http://localhost:3000',
  PORT: 3000 
}
