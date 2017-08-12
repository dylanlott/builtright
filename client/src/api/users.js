import request from './index.js'

const users = {
  login (user) {
    return request('POST', '/api/auth/login', user)
      .then((data) => data)
      .catch((err) => err)
  },

  register (user) {
    return request('POST', '/api/auth/register', user)
      .then((data) => data)
      .catch((err) => err)
  }
}

export default users
