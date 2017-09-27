<template>
  <v-container flex>
    <h1>Dashboard</h1>
      <v-card>
        <v-card-title class="headline">Your Builds</v-card-title>
      </v-card>
      <v-card>
        <v-card-title class="headline">Recent Comments</v-card-title>
      </v-card>
      <v-card>
        <v-card-title class="headline">Favorited Posts</v-card-title>
      </v-card>
  </v-container>
</template>

<script>
import CreateBuildForm from '../components/CreateBuildForm.vue'
import { mapState } from 'vuex'

export default {
  name: 'dashboard',
  computed: mapState({
    user: state => state.user
  }),
  components: { }
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
