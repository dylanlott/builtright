import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

const storage = window.localStorage
const token = storage.getItem('token')
const URL = config.API_URL

export default {
  getPosts (options) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/posts`, {
        params: {
          type: 'forum',
          options
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  },

  createPost (post) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/posts`, post, {
        params: {
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  },

  getDetails (id) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/posts/${id}`, {
        params: {
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.log('Error getting post details: ', err)
        reject(err)
      })
    })
  },

  updatePost (id, post) {
    return new Promise((resolve, reject) => {
      axios.put('${URL}/posts/${id}', post, {
        params: {
        }
      })
      .then((res) => resolve(res.data))
    })
  },

  deletePost (id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${URL}/posts/${id}`, {
        params: {
        }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
    })
  }
}
