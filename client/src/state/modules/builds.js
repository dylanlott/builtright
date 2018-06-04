import * as types from '../mutation-types'
import builds from '../../api/builds'
import parts from '../../api/parts'
import { router } from '../../router/index'
import API from '../../api'

const client = API()
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
    state.details._parts.push(part)
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
  getBuilds ({commit, state, dispatch}, params) {
    commit(types.GET_BUILDS_REQUEST)
    return builds.get(params)
      .then((builds) => {
        commit(types.GET_BUILDS_SUCCESS, builds);
        return builds;
      })
      .catch((err) => {
        console.log('error: ', err)
        dispatch('flashError', 'Error retrieving builds')
        commit(types.GET_BUILDS_FAILURE, err)
      })
  },
  getBuildDetails ({commit, state}, id) {
    commit(types.GET_BUILD_DETAILS_REQUEST)
    return builds.getBuildDetails(id)
      .then((res) => commit(types.GET_BUILD_DETAILS_SUCCESS, res))
      .catch((err) => commit(types.GET_BUILD_DETAILS_FAILURE, err))
  },
  createNewBuild ({commit, state, dispatch}, build) {
    commit(types.CREATE_BUILD_REQUEST)
    return client.post(`/api/builds`, build)
      .then((response) => {
        dispatch('flashSuccess', 'Build created!')
        commit(types.CREATE_BUILD_SUCCESS, response)
      })
      .catch((err) => {
        dispatch('flashError', 'Error creating build.')
        commit(types.CREATE_BUILD_FAILURE, err)
      })
  },
  updateBuild ({ commit, state, dispatch}, payload) {
    return client.put(`/api/builds/${payload.id}`, payload.build)
      .then((res) => {
        dispatch('flashSuccess', 'Build updated')
        router.push({ name: 'buildDetails', params: {id: payload.id}})
      })
      .catch((err) => {
        console.error(err)
        dispatch('flashError', 'Error updating build')
      })
  },
  addPartToBuild ({commit, state, dispatch}, payload) {
    commit(types.ADD_PART_REQUEST)
    return client.post(`/api/builds/${payload.build}/new`, payload.part)
      .then((res) => {
        dispatch('flashSuccess', 'Part added to build.')
        commit(types.ADD_PART_SUCCESS, res.data)
      })
      .catch((err) => {
        dispatch('flashError', 'Error adding part. Please try again.')
        commit(types.ADD_PART_FAILURE, err)
      })
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
    commit(types.GET_BUILDS_REQUEST)
    return client.get(`/api/builds/search`, { params: {
      keywords: search
    }})
      .then((response) => commit(types.GET_BUILDS_SUCCESS, response.data.hits.hits))
      .catch((err) => commit(types.GET_BUILDS_FAILURE, err))
  }
}

export default {
  state,
  mutations,
  actions
}
