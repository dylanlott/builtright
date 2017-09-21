import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import user from './modules/user'
import builds from './modules/builds'
import posts from './modules/posts'
import comments from './modules/comments'
import parts from './modules/parts'
import alerts from './modules/alerts'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    builds,
    posts,
    comments,
    parts,
    alerts
  }
})
