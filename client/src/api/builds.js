import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

const storage = window.localStorage
const token = storage.getItem('token')
const API_URL = config.API_URL

export default {
  /**
   * getBuilds - Returns the user's builds
   *
   * @param  {Number} user    user_id integer
   * @param  {Object}  context vue context
   * @return {Array} Array of Build objects
   */
  getBuildsByUser (user, skip, limit, context) {
    return axios.get(`${API_URL}/api/builds`, {
        params: {
          skip: skip || 0,
          limit: limit || 50
        }
      })
      .then((res) => res.data)
      .catch((err) => console.error('Error getting builds by user: ', err))
  },

  /**
   * getBuildDetails - Gets details for a build.
   *
   * @param  {Number} id      user's ID
   * @param  {Object} context Vue context object
   * @return {Object}         Object build details
   */
  getBuildDetails (id, context) {
    return axios.get(`${API_URL}/api/builds/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error('Error getting build details: ', err))
  },

  get (query, context) {
    return axios.get(`${API_URL}/api/builds`, {params: { query }})
      .then((res) => res.data)
      .catch((err) => console.error('Error getting builds: ', err))
  },

  createBuild (build, context) {
    return axios.post(`${API_URL}/api/builds`, build)
      .then((res) => res.data)
      .catch((err) => console.error('Error creating build: ', err))
  },

  getAllBuilds (skip) {
    const params = {
      limit: 50,
      skip: skip,
    }
    return axios.get('/api/builds', params)
      .then((builds) => builds.data)
      .catch((err) => console.error(err))
  },

  deleteBuild (id) {
    return axios.delete(`${API_URL}/api/builds/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error('Error deleting build: ', err))
  },

  updateBuild (build, id) {
    return axios.put(`${API_URL}/api/builds/${id}`, build)
      .then(res => res.data)
      .catch(err => console.error('Error updating build: ', err))
  }
}
