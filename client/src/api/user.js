import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

const storage = window.localStorage
const API_URL = config.API_URL

export default {
  getUser (id, params={}, context) {
    return axios.get(`/users/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error(`Error getUser: ${err}`))
  },

  login(user, context) {
    return axios.post(`/authentication`, user)
      .then((res) => res.data)
      .catch((err) => console.error(`Error login: ${err}`))
  },

  signup (user, context) {
    return axios.post(`/users`, user)
      .then((user) => user.data)
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
    return storage.getItem('_id')
  }
}
