import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

export default {
  create (data) {
    return axios.post('/api/analytics', data, params)
      .then((res) => res.data)
      .catch((err) => err)
  }

  get () {
    return axios.get('/api/analytics', params)
      .then((res) => res.data)
      .catch((err) => err)
  }
}
