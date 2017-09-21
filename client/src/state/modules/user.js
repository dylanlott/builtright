import * as types from '../mutation-types'
import api from '../../api/user'
import { router } from '../../router/index'

const storage = window.localStorage 
const state = {
  user: {}, 
  token: storage.getItem('token') || '',
  user_id: storage.getItem('user_id') || '',
  email: storage.getItem('email') || '',
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
    storage.setItem('email', user.user.email)
    storage.setItem('token', user.token)
    storage.setItem('user_id', user.user_id)
  },
  [types.LOGOUT_USER_REQUEST] (state) {
    state.loading = true
    state.success = false
    state.token = null
    state.user = {}
    state.loading = true
    state.success = false
  },
  [types.LOGOUT_USER_SUCCESS] (state) {
    state.loading = false
    state.success = true
    state.token = null
    state.user = {}
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
    storage.setItem('email', user.user.email)
    storage.setItem('token', user.token)
    storage.setItem('user_id', user.user_id)
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
  },
  [types.RECEIVE_USER_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  }
}

const actions = {
  loginUser ({commit, state}, user) {
    commit(types.LOGIN_USER_REQUEST)
    return api.login(user)
      .then((user) => {
        commit(types.LOGIN_USER_SUCCESS, user)
        return user
      })
      .then((user) => {
        router.push({ name: 'dashboard' })
        return user
      })
      .then((user) => {
        commit(types.LOGIN_USER_SUCCESS, user)
        return user
      })
      .catch((err) => {
        commit(types.LOGIN_USER_FAILURE, err)
        console.log('err logging in user:', err);
      })
  },
  getAuthToken ({commit, state}) {
    return storage.getItem('token')
  },
  logoutUser ({commit, state}) {
    commit(types.LOGOUT_USER_REQUEST)
    storage.clear()
    location.reload()
    this.$swal('You have been logged out.')
    router.push({ name: 'landing' })
    commit(types.LOGOUT_USER_SUCCESS)
  },
  getUserInfo ({commit, state}, id) {
    commit(types.RECEIVE_USER_INFO)
    return api.getUser(id)
      .then((user) => {
        commit(types.RECEIVE_USER_SUCCESS, user)
        return user;
      })
      .catch((err) => {
        commit(types.RECEIVE_USER_FAILURE, err)
      })
  },
  signup ({commit, state}, user) {
    commit(types.SIGNUP_USER_REQUEST)
    return api.signup(user)
      .then((user) => {
        commit(types.SIGNUP_USER_SUCCESS, user)
        router.push({ name: 'dashboard' })
        return user
      })
      .catch((err) => {
        commit(types.SIGNUP_USER_FAILURE, err)
      })
  }
}

export default {
  state,
  mutations,
  actions
}