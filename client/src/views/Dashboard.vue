<template>
  <v-container flex>
    <v-layout>
      <v-flex>

        <template>
          <v-card color="grey lighten-4 mt-2" tile>
            <v-toolbar dark extended>
              <v-toolbar-title>Your Builds</v-toolbar-title>
            </v-toolbar>
              <v-card v-if="builds.length === 0">
                  <v-card-title>Oops! You don't have any builds.</v-card-title>
                </v-card>
                <v-card v-for="build in builds">
                  <v-card-title>{{ build.title }}</v-card-title>
                  <v-card-actions>
                    <v-btn>View</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-card>
        </template>
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
    user: state => state.user,
    builds: state => state.builds.builds,
    comments: state => state.comments
  }),
  created () {
    this.$store.dispatch('getBuilds', {
      _user: this.user.user_id 
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
