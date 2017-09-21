import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

export default {
  create (data) {
    axios.post('/analytics', data, params)
      .then((res) => res.data)
      .catch((err) => err)
  }

  get () {
    axios.get('/analytics', params)
      .then((res) => res.data)
      .catch((err) => err)
  }
}
