import * as types from '../mutation-types'
import builds from '../../api/builds'
import parts from '../../api/parts'
import { router } from '../../router/index'

const localStorage = window.localStorage
const user = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

const state = {
  builds: [],
  details: {},
  success: false,
  loading: false,
  errors: '',
  skip: 0,
  limit: 10,
  total: 0
}

const mutations = {
  [types.GET_BUILDS_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.GET_BUILDS_SUCCESS] (state, builds) {
    state.builds = builds.data
    state.limit = builds.limit
    state.skip = builds.skip
    state.total = builds.total
    state.loading = false
    state.success = true
  },
  [types.GET_BUILDS_FAILURE] (state, err) {
    state.errors = err
    state.loading = false
    state.success = false
  },
  [types.GET_BUILD_DETAILS_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.GET_BUILD_DETAILS_SUCCESS] (state, details) {
    state.details = details
    state.loading = false
    state.success = true
  },
  [types.GET_BUILD_DETAILS_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  },
  [types.CREATE_BUILD_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.CREATE_BUILD_SUCCESS] (state, build) {
    state.loading = false
    state.success = true
    state.build = build
  },
  [types.CREATE_BUILD_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  },
  [types.ADD_PART_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.ADD_PART_SUCCESS] (state, part) {
    state.loading = false
    state.success = true
    state.part = part
  },
  [types.ADD_PART_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  },
  [types.GET_PARTS_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.GET_PARTS_SUCCESS] (state, parts) {
    state.loading = false
    state.success = true
    state.parts = parts
  },
  [types.GET_PARTS_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  }
}

const actions = {
  getBuildsByUser ({commit, state}, user, skip, limit) {
    commit(types.GET_BUILDS_REQUEST)
    return builds.getBuildsByUser(user, skip, limit)
      .then((res) => commit(types.GET_BUILDS_SUCCESS, res.data))
      .catch((err) => commit(types.GET_BUILDS_FAILURE, err))
  },
  getBuildDetails ({commit, state}, id) {
    commit(types.GET_BUILD_DETAILS_REQUEST)
    return builds.getBuildDetails(id)
      .then((res) => commit(types.GET_BUILD_DETAILS_SUCCESS, res))
      .catch((err) => commit(types.GET_BUILD_DETAILS_FAILURE, err))
  },
  createNewBuild ({commit, state}, build) {
    commit(types.CREATE_BUILD_REQUEST)
    console.log('CREATE BUILD: ', build)
    return builds.createBuild(build)
      .then((build) => commit(types.CREATE_BUILD_SUCCESS, build))
      .catch((err) => commit(types.CREATE_BUILD_FAILURE, err))
  },
  addPartToBuild ({commit, state}, part) {
    commit(types.ADD_PART_REQUEST)
    return parts.addPartToBuild(part)
      .then((part) => commit(types.ADD_PART_SUCCESS, part))
      .catch((err) => commit(types.ADD_PART_FAILURE, err))
  },
  getPartsForBuild ({commit, state}, id) {
    commit(types.GET_PARTS_REQUEST)
    return parts.getPartsForBuild(id)
      .then((res) => commit(types.GET_PARTS_SUCCESS, res.data.data))
      .catch((err) => commit(types.GET_PARTS_FAILURE, err))
  },
  getAllBuilds ({commit, state}, skip) {
    commit(types.GET_BUILDS_REQUEST)
    return builds.getAllBuilds(skip)
      .then((builds) => commit(types.GET_BUILDS_SUCCESS, builds))
      .catch((err) => commit(types.GET_BUILDS_FAILURE, err))
  },
  deleteBuild ({commit, state}, id) {
    commit(types.DELETE_BUILD_REQUEST)
    return builds.deleteBuild(id)
      .then((build) => commit(types.DELETE_BUILD_SUCCESS, build))
      .catch((err) => commit(types.DELETE_BUILD_FAILURE, err))
  }
}

export default {
  state,
  mutations,
  actions
}
