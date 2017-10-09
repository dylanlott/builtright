<template>
  <v-container fluid wrap>
    <v-card class="admin">
      <v-toolbar dark class="grey darken-2">
        <v-toolbar-title class="headline">Admin Dashboard</v-toolbar-title>
      </v-toolbar>
      <v-layout ma-1 pa-2 wrap>
        <v-flex xs12 sm6 md3 ma-2> 
          <v-card>
            <v-card-title><div class="headline">Active Users</div></v-card-title>
            <v-card-text class="active-users">{{ activeUsers }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 ma-2> 
          <v-card>
            <v-card-title><div class="headline">Pages</div></v-card-title>
            <v-card-text>
              <v-list> 
                <v-list-tile v-for="(value, key) in pages">
                  <v-list-tile-title v-text="key"></v-list-tile-title>
                  <v-list-tile-content v-text="value"></v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card> 
        </v-flex>
        <v-flex xs12 sm6 md3 ma-2> 
          <v-card>
            <v-card-title><div class="headline">Referrers</div></v-card-title>
            <v-card-text>
                <v-list>
                  <v-list-tile v-for="(value, key) in referrers">
                    <v-list-tile-title v-text="key"></v-list-tile-title>
                    <v-list-tile-content v-text="value"></v-list-tile-content>
                  </v-list-tile>
                </v-list>
            </v-card-text>
          </v-card> 
        </v-flex> 
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { router } from '../router'
import io from 'socket.io-client'
const socket = io('localhost:3000')

export default {
  name: 'admin',
  data () {
    return {
      pages: {},
      referrers: {},
      activeUsers: 0
    }
  },
  computed: mapState({
    user: state => state.user,
    admin: state => state.admin
  }),
  created () {
    socket.on('updated-stats', (data) => {
      console.log('### DATA: ', data)
      this.pages = data.pages 
      this.referrers = data.referrers
      this.activeUsers = data.activeUsers
    })
  },
  beforeCreated () {
    this.$store.dispatch('checkRole', this.user.user_id, 'admin') 
  }
}
</script>

<style lang="stylus">
.active-users
  font-size: 3em 

.admin
  margin: 0px 
</style>
