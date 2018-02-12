<template>
  <v-container flex>
    <h1>Dashboard</h1>
  </v-container>
</template>

<script>
import CreateBuildForm from '../components/CreateBuildForm.vue'
import { mapState } from 'vuex'

export default {
  name: 'dashboard',
  computed: mapState({
    user: state => state.user,
    builds: state => state.builds,
    comments: state => state.comments
  }),
  created () {
    this.$store.dispatch('getBuilds', {
      limit: 5,
      skip: 0,
      sort: -1
    })
  }
}
</script>

<style media="screen" lang="stylus">
  .secondary__nav
    background-color: #eee
    margin: 0px 0px
    padding: 15px 30px
    width: 100%
    height: 50px
    text-align: left

  .card__basic
    margin: 40px 0px

  .dropdown__floating
    width: 200px
</style>

<style scoped>
  .card__title
    margin: 20px 20px
</style>
