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

api.defaults.headers.common['Authorization'] = ls.getItem('token')

const Client =  {
  request: (method, path, options) => {
    return api.request({
      path,
      method,
      ...options
    });
  },

  token: () => ls.getItem('token')
}

export default Client
