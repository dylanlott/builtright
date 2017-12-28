'use strict';

import config from '../config'
import axios from 'axios'

const ls = window.localStorage
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Authorization': ls.getItem('token')
  }
})

export default api
