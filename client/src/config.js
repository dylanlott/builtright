export default {
  API_URL: process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : 'http://localhost:3000',
  PORT: 3000,
  SOCKET_IO: process.env.SOCKET_IO || 'localhost:3000'
}
