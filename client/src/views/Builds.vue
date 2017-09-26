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
        <BuildsList></BuildsList>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import BuildsList from '../components/BuildsList.vue'
export default {
  created () {
    this.$store.dispatch('getBuildsByUser', this.user_id, 0, this.limit)
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
