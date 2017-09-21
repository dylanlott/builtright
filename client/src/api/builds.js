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
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/builds`, {
        params: {
          user
        }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
    })
  },

  /**
   * getBuildDetails - Gets details for a build.
   *
   * @param  {Number} id      user's ID
   * @param  {Object} context Vue context object
   * @return {Object}         Object build details
   */
  getBuildDetails (id, context) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/builds/${id}`, {
        params: {
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  },


  createBuild (build, context) {
    return new Promise((resolve, reject) => {
      const url = API_URL + '/builds'
      axios.post(url, build, {
        params: {
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  },

  getAllBuilds (skip, context) {
    return new Promise((resolve, reject) => {
      const params = {
        limit: 10,
        skin: skip,
      }
      axios.get('/builds', params)
        .then((builds) => resolve(builds.data))
        .catch((err) => err)
    })
  },

  deleteBuild (id) {
    return new Promise((resolve, reject) => {
      const params = {
        id
      }
      axios.delete(`${API_URL}/builds/${id}`)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  },

  updateBuild (build, id) {
    return new Promise((resolve, reject) => {
      const params = {
      }
      axios.put(`${API_URL}/builds/${id}`, build, params)
        .then(res => {

        })
        .catch(err => reject(err))
    })
  }
}
