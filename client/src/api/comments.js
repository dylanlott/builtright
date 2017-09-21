import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

const storage = window.localStorage
const token = storage.getItem('token')
const API_URL = config.API_URL

export default {


  /**
   * getComments - gets comments for item with _id of `id`
   *
   * @param  {type} id mongo id
   * @return {type}    returns an axios promise
   */
  getComments (id) {
    return axios.get('/comments', {
      params: {
        source: id
      }
    })
    .then((res) => res.data)
    .catch((err) => err)
  },

  /**
   * createComment - create a comment
   *
   * @param  {type} comment comment object
   * @return {type}         returns an axios promise
   */
  createComment (comment) {
    return axios.post('/comments', comment)
      .then((res) => res.data)
      .catch((err) => err)
  }
}
