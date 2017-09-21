import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

const storage = window.localStorage
const API_URL = config.API_URL

export default {
  getUser (id) {
    return axios.get(`/api/users/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error(`Error getUser: ${err}`))
  },

  login(user, context) {
    return axios.post(`/api/auth/login`, user)
      .then((res) => res.data)
      .catch((err) => console.error(`Error login: ${err}`))
  },

  signup (user, context) {
    return axios.post(`/api/auth/register`, user)
      .then((res) => res.data)
      .catch((err) => console.error(`Error signup: ${err}`))
  },

  getAuthHeader () {
    return {
      'x-access-token': storage.getItem('token')
    }
  },

  checkAuth () {
    return storage.getItem('token') ? true : false
  },

  getToken () {
    return storage.getItem('token')
  },

  getUserEmail () {
    return storage.getItem('email')
  },

  getUserId () {
    return storage.getItem('user_id')
  }
}
