import {
  ADD_ALERT
} from '../mutation-types'

// declare alert in a higher scope so that it clears out
let alert = {}

const state = {
  snackbar: {
    snackbar: false,
    y: 'top',
    x: null,
    mode: 'vertical',
    timeout: 6000,
    text: '',
    color: ''
  }
}

const mutations = {
  [ADD_ALERT] (state, alert) {
    state.snackbar = alert
  }
}

const actions = {
  flashInfo ({ commit }, message) {
    alert.snackbar = true
    alert.text = message
    alert.color = 'info'
    commit(ADD_ALERT, alert)
    alert = {}
  },

  flashSuccess ({ commit }, message) {
    alert.snackbar = true
    alert.text = message
    alert.color = 'success'
    commit(ADD_ALERT, alert)
    alert = {}
  },

  flashError ({ commit }, message) {
    alert.snackbar = true
    alert.text = message
    alert.color = 'error'
    commit(ADD_ALERT, alert)
    alert = {}
  }
}

export default {
  state,
  mutations,
  actions
}
