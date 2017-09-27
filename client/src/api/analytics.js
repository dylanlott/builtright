import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'
const API_URL = config.API_URL

export default {
  create (data) {
    return axios.post(`${API_URL}/api/analytics`, data)
      .then((res) => res.data)
      .catch((err) => err)
  }

  get () {
    return axios.get('/api/analytics', params)
      .then((res) => res.data)
      .catch((err) => err)
  }
}
