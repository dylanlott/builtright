<template>
  <v-container flex>

    <h1>Dashboard</h1>
      <v-layout row wrap>

        <v-flex md4 xs12>
          <v-card class="primary white--text">
            <v-card-text>Start your build with us</v-card-text>
          </v-card>
        </v-flex>

        <v-flex md4 xs12>
          <v-card class="primary white--text">
            <v-card-text>
              Check out the forums
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md4 xs12>
          <v-card class="primary white--text">
            <v-card-text>
              Explore projects from the community
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
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
