import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import {router} from './router/index.js'
import store from './state/index.js'
import user from './api/user'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueSweetAlert from 'vue-sweetalert'
import config from './config'
import user from './api/user'

const storage = window.localStorage

Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(VueSweetAlert)

axios.defaults.baseURL = config.API_URL
axios.defaults.params = {
  token: user.getToken()
}

axios.interceptors.response.use(function(config) {
  console.log('response: ', config)
  return config
}, function(err) {
  if (err.message === 'Request failed with status code 401') {
    localStorage.clear()
  }
  return Promise.reject(err)
})

router.beforeEach((to, from, next) => {
  (to.meta.auth && !user.checkAuth() && user.checkAuth() !== undefined)
    ? next({path: '/login'})
    : next(true)
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
