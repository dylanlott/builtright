import axios from 'axios'
import * as types from '../state/mutation-types'
import config from '../config'

const storage = window.localStorage
const token = storage.getItem('token')
const API_URL = config.API_URL

export default {
  getBuildDetails (id, context) {
    return axios.get(`${API_URL}/api/builds/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error('Error getting build details: ', err))
  },

  get (params) {
    return axios.get(`${API_URL}/api/builds`, { params: params })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error('Error getting builds: ', err))
  },

  createBuild (build, context) {
    return axios.post(`${API_URL}/api/builds`, build)
      .then((res) => res.data)
      .catch((err) => console.error('Error creating build: ', err))
  },

  addPartToBuild (build, part) {
    return axios.post(`${API_URL}/api/builds/${build}/new`)
      .then((res) => res.data)
      .catch((err) => console.error('Error adding part to build', err));
  },

  getAllBuilds (skip) {
    const params = {
      limit: 50,
      skip: skip,
    }
    return axios.get(`${API_URL}/api/builds`, params)
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
