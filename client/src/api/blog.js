import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

const access = window.localStorage.get('access')

export default {
  getBlogPosts () {
    return axios.get('/api/posts', {
        type: 'blog'
      })
      .then((res) => res.data)
      .catch((err) => err)
  },

  createBlogPost (blog) {
    if (access <= 1000) {
      return console.error('Must be admin to post a blog entry.')
    }
    return axios.post('/api/posts', blog)
      .then((res) => res.data)
      .catch((err) => err)
  }
}
