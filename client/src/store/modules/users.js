import users from '../../api/users.js'
import * as types from '../mutation-types.js'
import router from '../../router'

const storage = window.localStorage

const state = {
  token: '',
  user: {}
}

const mutations = {
  [types.LOGIN_USER_REQUEST] (state) {
    state.isLoading = true
  },
  [types.LOGIN_USER_SUCCESS] (state, data) {
    state.isLoading = false
    state.token = data.token
    state.user = data.user
    storage.setItem('token', data.token)
    storage.setItem('user', data.user.toString())
    router.push('dashboard')
    console.log(storage.getItem('token'))
    console.log(storage.getItem('user'))
  },
  [types.LOGIN_USER_FAILURE] (state, err) {
    state.isLoading = false
    state.notifications.push(err)
  },
  [types.REGISTER_USER_REQUEST] (state) {
    state.isLoading = true
  },
  [types.REGISTER_USER_SUCCESS] (state, data) {
    state.isLoading = false
    state.token = data.token
    state.user = data.user
    storage.setItem('token', data.token)
    storage.setItem('user', data.user)
  }
}

const actions = {
  login ({commit}, userData) {
    commit(types.LOGIN_USER_REQUEST)
    users.login(userData)
      .then((data) => commit(types.LOGIN_USER_SUCCESS, data.data))
      .catch((err) => commit(types.LOGIN_USER_FAILURE, err))
  },

  register ({commit}, userData) {
    commit(types.REGISTER_USER_REQUEST)
    users.register(userData)
      .then((data) => commit(types.REGISTER_USER_SUCCESS, data.data))
  }
}

export default {
  state,
  mutations,
  actions
}
