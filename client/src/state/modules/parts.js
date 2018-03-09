import * as types from '../mutation-types'
import builds from '../../api/builds'
import parts from '../../api/parts'
import { router } from '../../router/index'
import client from '../../api'

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
    console.log('pushed part', part.part)
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
  addPart ({commit, state}, part, build, id) {
    commit(types.ADD_PART_REQUEST)
    return parts.addPartToBuild(part, build, id)
      .then((res) => commit(types.ADD_PART_SUCCESS), part)
      .catch((err) => commit(types.ADD_PART_FAILURE, err))
  },
  deletePart ({commit, state}, build, id) {

  },
  editPart ({commit, state}, part, newPart) {

  },
  getParts ({commit, state}, params) {

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
