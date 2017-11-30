'use strict';

import config from '../config'
import axios from 'axios'

const ls = window.localStorage
const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Authorization': ls.getItem('token')
  }
})

export default api
