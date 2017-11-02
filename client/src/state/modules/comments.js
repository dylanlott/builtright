import axios from 'axios'
import * as types from '../mutation-types'
import comments from '../../api/comments'

const state = {
  comments: [],
  limit: 0,
  skip: 0,
  total: 0,
  loading: false
}

const mutations = {
  [types.GET_POST_COMMENTS_REQUEST] (state) {
    state.loading = true
    state.success = false
    state.errors = null
  },
  [types.GET_POST_COMMENTS_SUCCESS] (state, comments) {
    state.loading = false
    state.success = true
    state.errors = null
    state.comments = comments
  },
  [types.GET_POST_COMMENTS_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  },
  [types.ADD_COMMENT_REQUEST] (state) {
    state.loading = true
    state.success = false
    state.errors = null
  },
  [types.ADD_COMMENT_SUCCESS] (state, comment) {
    state.loading = false
    state.success = true
    state.comments.push(comment)
  },
  [types.ADD_COMMENT_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  },
  [types.SET_COMMENT_SKIP] (state, skip) {
    state.skip = skip
  },
  [types.SET_COMMENT_TOTAL] (state, total) {
    state.total = total
  },
  [types.SET_COMMENT_LIMIT] (state, limit) {
    state.limit = limit
  }
}

const actions = {
  getComments ({commit, state}, data) {
    commit(types.GET_POST_COMMENTS_REQUEST)
    return comments.getComments(data.resource, data.id)
      .then((res) => commit(types.GET_POST_COMMENTS_SUCCESS, res._comments))
      .catch((err) => commit(types.GET_POST_COMMENTS_FAILURE, err))
  },

  addComment ({commit, state}, payload) {
    commit(types.ADD_COMMENT_REQUEST)
    return comments.create(payload.resource, payload.id, payload.comment)
      .then((res) => commit(types.ADD_COMMENT_SUCCESS, comment))
      .catch((err) => commit(types.ADD_COMMENT_FAILURE, err))
  }
}

export default {
  state,
  mutations,
  actions
}
