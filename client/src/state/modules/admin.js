import { SET_ROLE } from '../mutation-types'
import user from '../../api/user'
import { router } from '../../router'

const state = {
  admin: false,
  role: null,
  stats: {}
}

const mutations = {
  [SET_ROLE] (commit, role) {
    state.role = role
  }
}

const actions = {

  checkRole ({commit}, id, role) {
    return user.getUser(id)
      .then(res => {
        if (res.role !== role) {
         commit('SET_ROLE', null)
         router.push({ name: 'dashboard' })
         return false
        }

        return true
      })
      .catch(err => console.error('Error checkRole: ', err))
  }
}

export default {
  state,
  mutations,
  actions
}
