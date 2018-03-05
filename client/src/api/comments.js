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

  /**
   * update - update a comment on a resource
   *
   * @param  {type} comment   comment object
   * @param  {type} id        id of resource
   * @param  {type} resource  the resource to post a comment to
   * @return {type}           returns an axios promise
   */
  update (resource, id, comment) {
    return axios.put(`/api/${resource}/${id}`, comment)
      .then((res) => res.data)
      .catch((err) => err)
  },

  /**
   * vote - vote up or down on a comment
   *
   * Resource can be `build`, `post`, or `comment`
   *
   * @param  {Model}      resource   comment object
   * @param  {ObjectId}   id        id of resource
   * @param  {direction}  up or down
   * @return {type}       returns an axios promise
   */
  vote (resource, id, direction) {
    return axios.post(`/api/${resource}/${id}/${direction}`)
      .then((res) => res.data)
      .catch((err) => err)
  }
}
