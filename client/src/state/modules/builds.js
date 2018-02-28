import * as types from '../mutation-types'
import builds from '../../api/builds'
import parts from '../../api/parts'
import { router } from '../../router/index'
import client from '../../api'
const localStorage = window.localStorage

const state = {
  builds: [],
  details: {},
  success: false,
  loading: false,
  errors: ''
}

const mutations = {
  [types.GET_BUILDS_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.GET_BUILDS_SUCCESS] (state, builds) {
    state.builds = builds
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
    state.builds.push(build)
    console.log('create build success', state.builds)
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
  getBuilds ({commit, state}, params) {
    commit(types.GET_BUILDS_REQUEST)
    return builds.get(params)
      .then((builds) => {
        commit(types.GET_BUILDS_SUCCESS, builds);
        return res;
      })
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
    return client.post(`/api/builds`, build)
      .then((response) => commit(types.CREATE_BUILD_SUCCESS, response))
      .catch((err) => commit(types.CREATE_BUILD_FAILURE, err))
  },
  addPartToBuild ({commit, state}, part) {
    commit(types.ADD_PART_REQUEST)
    return builds.addPartToBuild(part.data.build, part)
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
  },
  searchBuilds ({commit, state}, search) {

  }
}

export default {
  state,
  mutations,
  actions
}
