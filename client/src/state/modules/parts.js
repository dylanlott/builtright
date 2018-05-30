import * as types from '../mutation-types'
import builds from '../../api/builds'
import parts from '../../api/parts'
import { router } from '../../router/index'
import api from '../../api'

const client = api()

const state = {
  parts: [],
  details: [],
  loading: false,
  success: true,
  errors: ''
}

const mutations = {
  [types.GET_PARTS_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.GET_PARTS_SUCCESS] (state, parts) {
    state.parts = parts
    state.loading = false
    state.success = true
    state.skip = parts.skip
    state.limit = parts.limit
    state.total = parts.total
  },
  [types.GET_PARTS_FAILURE] (state, errors) {
    state.errors = errors
    state.loading = false
    state.success = false
  },
  [types.ADD_PART_REQUEST] (state) {
    state.loading = true
    state.success = false
    state.errors = ''
  },
  [types.ADD_PART_SUCCESS] (state, part) {
    state.loading = false
    state.success = true
    state.parts.push(part.part)
    state.errors = ''
  },
  [types.ADD_PART_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  },
  [types.GET_PARTS_DETAILS_REQUEST] (state) {
    state.loading = true
    state.success = false
    state.errors = null
  },
  [types.GET_PARTS_DETAILS_SUCCESS] (state, data) {
    state.success = true
    state.loading = false
    state.details = data
  },
  [types.GET_PARTS_DETAILS_FAILURE] (state, err) {
    state.loading = false
    state.success = false
    state.errors = err
  }
}

const actions = {
  addPart ({commit, state, dispatch}, part, build, id) {
    commit(types.ADD_PART_REQUEST)
    dispatch('flashSuccess', 'Part added')
    return parts.addPartToBuild(part, build, id)
      .then((res) => commit(types.ADD_PART_SUCCESS), part)
      .catch((err) => {
        dispatch('flashError', 'There was an error adding this part.')
        commit(types.ADD_PART_FAILURE, err)
      })
  },
  deletePart ({commit, state, dispatch}, build, id) {
    return client.delete(`/api/parts/${id}`)
      .then((res) => {
        dispatch('flashInfo', 'Part deleted')
      })
      .catch((err) => {
        dispatch('flashError', 'Internal error. Please try again.')
      })
  },
  editPart ({commit, state}, part) {
    return client.put(`/api/parts/${id}`, part)
      .then((res) => {
        dispatch('flashInfo', 'Part updated.')
      })
      .catch((err) => {
        dispatch('flashError', 'Error updating part. Please try again.')
      })
  },
  getParts ({commit, state}, params) {
    commit(types.GET_PARTS_REQUEST)
    return client.get(`/api/parts`, params)
      .then((res) => {
        commit(types.GET_PARTS_SUCCESS, res.data)
        return res
      })
      .catch((err) => {
        dispatch('flashError', 'Error retrieving parts. Please try again.')
      })
  },
  getPartDetails ({commit, state}, id) {
    return client.get(`/api/parts/${id}`)
      .then((res) => commit(types.GET_PARTS_DETAILS_SUCCESS, res.data))
      .catch((err) => commit(types.GET_PARTS_DETAILS_FAILURE, err))
  }
}

export default {
  state,
  mutations,
  actions
}
