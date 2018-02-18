import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import {router} from './router/index.js'
import store from './state/index.js'
import user from './api/user'
import axios from 'axios'
import VueSweetAlert from 'vue-sweetalert'
import config from './config'
import user from './api/user'
import Gravatar from 'vue-gravatar'
import VueMoment from 'vue-moment'

Vue.component('v-gravatar', Gravatar);
Vue.use(VueSweetAlert)
Vue.use(VueMoment)
Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: "#F4511E",
    secondary: "#BDBDBD",
    accent: "#0288D1",
    error: "#FF5252",
    warning: "#FFC400",
    info: "#2196f3",
    success: "#7CB342"
  }
})

axios.defaults.baseURL = config.API_URL
axios.defaults.headers.common['Authorization'] = user.getToken();

router.beforeEach((to, from, next) => {
  if (to.meta.admin && !user.checkRole('admin')) next({ path: '/login' });

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
