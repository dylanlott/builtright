<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile router :to="{ name: 'dashboard' }">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{ name: 'builds' }">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Builds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>BuiltRight</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app fixed dark>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import Gravatar from 'vue-gravatar'
import {mapState} from 'vuex'
import {router} from './router/index'
import BottomNav from './components/BottomNav.vue'
import AppFooter from './components/footer/Footer.vue'
import config from './config'

export default {
  name: 'builtright',
  computed: mapState({
    user: state => state.user,
    token: state => state.user.token,
    alerts: state => state.alerts
  }),
  data() {
    return {
      drawer: null,
      show: false
    }
  },
  props: {
    source: String 
  },
  methods: {
    goToDashboard () {
      if (this.token) {
        router.push('dashboard')
      }
    },
    logout () {
      this.$store.dispatch('logoutUser')
    },
  }
}
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main'
  @import './css/main.styl'
  @import './css/theme.styl'

  body
    font-size: 16px

  .menu-link
    text-decoration: none

  #app-logo
    margin-top: 5px
</style>
