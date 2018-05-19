import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Buefy from 'buefy'
import {router} from './router/index.js'
import store from './state/index.js'
import user from './api/user'
import axios from 'axios'
import VueSweetAlert from 'vue-sweetalert'
import config from './config'
import user from './api/user'
import Gravatar from 'vue-gravatar'
import VueMoment from 'vue-moment'
import InputTag from 'vue-input-tag'
import 'buefy/lib/buefy.css'
// import VueAnalytics from 'vue-ua'
import VueAnalytics from 'vue-analytics'

// Vue.use(VueAnalytics, {
//   appName: 'BuiltRight',
//   appVersion: '0.0.1',
//   trackingId: 'UA-116394831-2',
//   vueRouter: router
// })

Vue.use(VueAnalytics, {
  id: 'UA-116394831-2',
  router
})
Vue.component('v-gravatar', Gravatar);
Vue.component('input-tag', InputTag);
Vue.use(VueSweetAlert)
Vue.use(VueMoment)
Vue.use(Buefy)
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
  if (to.meta.admin && !user.checkRole('admin')) {
    return next({ path: '/login' })
  }

  (to.meta.auth && !user.checkAuth())
    ? next({ path: '/login' })
    : next(true)
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
