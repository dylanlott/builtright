import * as types from '../mutation-types'
import { router } from '../../router/index'
import api from '../../api'

const client = api()
const storage = window.localStorage
const state = {
  user: {},
  token: storage.getItem('token') || '',
  user_id: storage.getItem('user_id') || '',
  email: storage.getItem('email') || '',
  role: storage.getItem('role') || '',
  admin: false,
  access: 1000,
  loading: false,
  success: true
}

const mutations = {
  [types.LOGIN_USER_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.LOGIN_USER_SUCCESS] (state, user) {
    state.loading = false
    state.success = true
    state.user = user.user
    state.email = user.user.email
    state.token = user.token
    state.user_id = user.user._id
    state.role = user.user.role
    storage.setItem('email', user.user.email)
    storage.setItem('token', user.token)
    storage.setItem('_id', user.user._id)
    storage.setItem('user_id', user.user._id)
    storage.setItem('role', user.user.role)
  },
  [types.LOGOUT_USER_REQUEST] (state) {
    state.loading = true
    state.success = false
    state.token = null
    state.role = null
    state.user = {}
    state.loading = true
    state.success = false
  },
  [types.LOGOUT_USER_SUCCESS] (state) {
    state.loading = false
    state.success = true
  },
  [types.SIGNUP_USER_REQUEST] (state, user) {
    state.loading = true
    state.success = false
  },
  [types.SIGNUP_USER_SUCCESS] (state, user) {
    state.loading = false
    state.success = true
    state.user = user.user
    state.email = user.user.email
    state.token = user.token
    state.user_id = user.user._id
    state.role = user.user.role
    storage.setItem('token', user.token)
    storage.setItem('email', user.user.email)
    storage.setItem('_id', user.user._id)
    storage.setItem('user_id', user.user._id)
    storage.setItem('role', user.user.role)
  },
  [types.SIGNUP_USER_FAILURE] (state, err) {
    state.loading = false
    state.success = false
    state.errors = err;
  },
  [types.RECEIVE_USER_INFO] (state) {
    state.loading = true
    state.success = false
  },
  [types.RECEIVE_USER_SUCCESS] (state, user) {
    state.loading = false
    state.success = true
    state.user = user.user
    state.email = user.user.email
    state.token = user.token
    state.user_id = user.user._id
    state.role = user.user.role
    storage.setItem('email', user.user.email)
    storage.setItem('token', user.token)
    storage.setItem('_id', user.user._id)
    storage.setItem('user_id', user.user._id)
    storage.setItem('role', user.user.role)
  },
  [types.RECEIVE_USER_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  }
}

const actions = {
  loginUser ({commit, state, dispatch}, user) {
    commit(types.LOGIN_USER_REQUEST)
    return client.post(`/api/auth/login`, user)
      .then((response) => {
        commit(types.LOGIN_USER_SUCCESS, response.data)
        dispatch('flashSuccess', 'Logged in')
        router.push({ name: 'dashboard' })
        return response.data
      })
      .catch((err) => {
        dispatch('flashError', 'Failed to login. Try again.')
        commit(types.LOGIN_USER_FAILURE, err)
      })
  },
  getAuthToken ({commit, state}) {
    return storage.getItem('token')
  },
  logoutUser ({commit, state, dispatch}) {
    commit(types.LOGOUT_USER_REQUEST)
    dispatch('flashInfo', 'Logged out')
    storage.clear()
    location.reload()
    router.push({ name: 'logout' })
    commit(types.LOGOUT_USER_SUCCESS)
  },
  getUserInfo ({commit, state}, id) {
    commit(types.RECEIVE_USER_INFO)
    return client.get(`/api/users/${id}`)
      .then((res) => {
        commit(types.RECEIVE_USER_SUCCESS, res)
        return user;
      })
      .catch((err) => {
        commit(types.RECEIVE_USER_FAILURE, err)
      })
  },
  signup ({commit, state, dispatch}, user) {
    commit(types.SIGNUP_USER_REQUEST)
    return client.post(`/api/auth/register`, user)
      .then((res) => {
        dispatch('flashSuccess', 'Sign up successful')
        commit(types.SIGNUP_USER_SUCCESS, res.data)
        return res
      })
      .then(res => {
        router.push({ name: 'builds' })
      })
      .catch((err) => {
        if (err.response.status == 422) {
          dispatch('flashError', 'That email is already taken. Please try a different one.')
        } else {
          dispatch('flashError', 'Error signing up')
        }

        commit(types.SIGNUP_USER_FAILURE, err)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
