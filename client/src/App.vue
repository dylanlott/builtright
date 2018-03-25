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
        <v-list-tile router :to="{ name: 'forum' }">
          <v-list-tile-action>
            <v-icon>edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Forum</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-if="token" @click="logout()">
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Profile &amp; Account</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="token" @click="logout()">
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile router :to="{ name: 'login' }" v-if="!token">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile router :to="{ name: 'signup' }" v-if="!token">
          <v-list-tile-action>
            <v-icon>create</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img @click="goToDashboard()" src="./static/img/logo-horizontal.png" height="30px">
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer height="auto" class="grey darken-3">
    <v-layout row wrap justify-center>
        <a class="routerlink" flat dark href="https://www.reddit.com/builtright"><v-btn color="white" flat>Reddit</v-btn></a>
        <a class="routerlink" flat dark href="https://www.facebook.com/builtrightapp"><v-btn color="white" flat>Faceboook</v-btn></a>
        <a class="routerlink" flat dark href="https://www.twitter.com/builtrightapp"><v-btn color="white" flat>Twitter</v-btn></a>
        <a class="routerlink" flat dark href="https://www.builtrightapp.com/blog"><v-btn color="white" flat>Blog</v-btn></a>
      <v-flex xs12 py-3 text-xs-center white--text>
        &copy;2018 — <strong>BuiltRight</strong>
      </v-flex>
    </v-layout>
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
  data () {
    return {
    }
  },
  computed: mapState({
    user: state => state.user,
    token: state => state.user.token,
    alerts: state => state.alerts
  }),
  data() {
    return {
      drawer: !!this.token
    }
  },
  props: {
    source: String 
  },
  methods: {
    goToDashboard () {
      if (this.token) {
        router.push({ name: 'dashboard' })
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

  .routerlink
    text-decoration: none
</style>
