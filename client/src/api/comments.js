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
   * @param  {type} resource  the resource to query
   * @param  {type} id        id or slug of resource
   * @return {type}    returns an axios promise
   */
  getComments (resource, id) {
    console.log('getComments: ', resource, id)
    return axios.get(`/api/${resource}/${id}`)
      .then((res) => res.data)
      .catch((err) => err)
  },

  /**
   * comment - create a comment on resource with id
   *
   * @param  {type} comment comment object
   * @param  {type} id        id of resource
   * @param  {type} resource  the resource to post a comment to
   * @return {type}           returns an axios promise
   */
  create (resource, id, comment) {
    return axios.post(`/api/${resource}/${id}`, comment)
      .then((res) => res.data)
      .catch((err) => err)
  },

  update (resource, id, comment) {
    return axios.put(`/api/${resource}/${id}`, comment)
      .then((res) => res.data)
      .catch((err) => err)
  }
}
