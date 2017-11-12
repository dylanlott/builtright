<template>
  <v-app id="builtright-app">
    <v-navigation-drawer temporary v-model="drawer" dark>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
           <router-link v-if="!token" :to="{ name: 'dashboard' }">
              <img src="./img/logo-horizontal.png" alt="" height="35" class="app-logo">
            </router-link>
            <v-list-tile-avatar>
              <v-gravatar v-if="token" default-img="retro" :email="this.user.email" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.email }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>

      <v-divider dark class="my-4"></v-divider>

       <router-link v-if="token"
          :to="{ name: 'dashboard' }"
          class="menu-link">
         <v-list>
           <v-list-tile>
             <v-list-tile-action>
               <v-icon>dashboard</v-icon>
             </v-list-tile-action>
             <v-list-tile-content>
               <v-list-tile-title>Dashboard</v-list-tile-title>
             </v-list-tile-content>
           </v-list-tile>
         </v-list>
       </router-link>

        <router-link v-if="token"
            :to="{ name: 'builds' }"
            class="menu-link">
          <v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>build</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Builds</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </router-link>

        <router-link class="menu-link" :to="{ name: 'forum' }">
          <v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Forum</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </router-link>


        <router-link v-if="token"
            class="menu-link"
            :to="{ name: 'profile'}">
          <v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>account_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Profile</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </router-link>

        <v-divider
         dark
         class="my-4"
       ></v-divider>

        <v-list v-if="token" @click.native="logout()">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>clear</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed class="deep-orange">
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link :to="{ name: 'dashboard' }">
          <img src="./img/logo-horizontal.png" alt="" height="35" class="app-logo">
        </router-link>
      </v-toolbar-title>
    </v-toolbar>
    <main>
      <v-alert info dismissible v-model="alert" v-if="alerts.length"></v-alert> 
      <router-view></router-view>
      <Footer></Footer>
      <BottomNav user="user"></BottomNav>
    </main>
  </v-app>
</template>

<script>
import io from 'socket.io-client';
import Gravatar from 'vue-gravatar'
import {mapState} from 'vuex'
import {router} from './router/index'
import BottomNav from './components/BottomNav.vue'
import Footer from './components/footer/Footer.vue'
import config from './config'

const socket = io(config.API_URL);

const visitorData = {
  user: window.localStorage.getItem('email'),
  referringSite: document.referrer,
  page: location.pathname
}
socket.emit('visitor-data', visitorData);

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
  components: {
    BottomNav,
    Footer
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

  #builtright-app
    color: charcoal

    @media (max-width: 500px)
      padding-bottom: 1px 

  .content
    margin-top: 0px
    background-color: white

  .sidebar-main
    color: #fff

  .menu-link
    text-decoration: none

  #app-logo
    margin-top: 5px
</style>
