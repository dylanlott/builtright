<template>
  <div>
    <div class="secondary__nav">
      Dashboard / Builds
    </div>

    <router-link class="routerlink hidden-xs-only" to="/builds/create">
      <v-btn floating class="success floating">
        <v-icon class="white--text">add</v-icon>
      </v-btn>
    </router-link>

    <v-layout row wrap>
      <v-flex xs12>
        <BuildsList :builds="builds.builds" loading="loading"></BuildsList>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import BuildsList from '../components/BuildsList.vue'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      query: {
        limit: 50,
        skip: 0
      }
    }
  },
  computed: mapState({
    user: state => state.user,
    builds: state => state.builds,
    loading: state => state.loading
  }),
  created () {
    this.$store.dispatch('getBuilds', {})
  },
  components: { BuildsList }
}
</script>

<style media="screen" lang="stylus">
  .floating
    position: absolute
    top: 120px
    right: 20px

  .secondary__nav
    margin-bottom: 20px

  .routerlink
    text-decoration: none
</style>
