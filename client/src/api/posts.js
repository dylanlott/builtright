import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

const storage = window.localStorage
const token = storage.getItem('token')
const URL = config.API_URL

export default {
  getPosts (options) {
    return axios.get(`${URL}/api/posts`)
      .then((res) => res.data)
      .catch((err) => console.error('Error getting posts: ', err))
  },

  createPost (post) {
    return axios.post(`${URL}/api/posts`, post)
      .then((res) => res.data)
      .catch((err) => console.error('Error creating post: ', err))
  },

  getDetails (id) {
    return axios.get(`${URL}/api/posts/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error('Error getting post details: ', err))
  },

  comment (id, comment) {
    return axios.post(`${URL}/api/posts/${id}`, comment)
      .then((res) => res.data)
      .catch((err) => console.error('Error posting comment to post: ', err))
  },

  updatePost (id, post) {
    return axios.put('${URL}/api/posts/${id}', post)
      .then((res) => resolve(res.data))
      .catch(err => console.error('Error updating post: ', err))
  },

  deletePost (id) {
    return axios.delete(`${URL}/api/posts/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error('Error deleting post: ', err))
  }
}
