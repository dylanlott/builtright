<template>
  <div>
    <h1>Your Builds</h1>

    <v-progress-linear v-if="loading"
      v-bind:indeterminate="true">
    </v-progress-linear>

    <v-card v-if="!builds.length">
      <v-card-text>You don't have any builds. Start your first!</v-card-text>
    </v-card>
    <v-card
      class="build__cards grey darken-3 white--text"
      v-for="build in builds">
        <v-card-row>
          <v-card-title>
            {{ build.title }}
          </v-card-title>

        </v-card-row>
        <v-card-row>
          <v-card-text>
            {{build.year}} {{build.make}} {{build.model}}
          </br/>
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <router-link class="routerlink"
            :to="{name: 'buildDetails', params: { id: build._id }}">
            <v-btn flat class="white--text">View</v-btn>
          </router-link>
          <v-spacer></v-spacer>
          Share
          <v-btn icon dark>
            <v-icon class="white--text">share</v-icon>
          </v-btn>
        </v-card-row>
      </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { router } from '../router/index'

const storage = window.localStorage

export default {
  name: 'buildsList',
  computed: mapState({
    user: state => state.user,
    builds: state => state.builds.builds,
    loading: state => state.loading
  }),
  created () {
    this.$store.dispatch('getBuilds')
  }
}
</script>

<style lang="stylus">
  .build__cards
    margin: 40px 20px
</style>
