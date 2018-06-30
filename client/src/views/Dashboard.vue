<template>
  <v-container flex>
    <v-layout column justify-space-around>
      <v-flex>
        <v-card dark>
          <v-btn outline router :to="{ name: 'addBuild' }">Create a build</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs12> 
        <v-card>
          <v-card-title>
            <v-icon style="font-size: 38px;" color="secondary">star</v-icon> 
            <h1><strong>Recently created</strong></h1>
            <v-flex><h4><i>New builds, fresh off the press.</i></h4></v-flex>
          </v-card-title>
          <v-card-text>

            <v-list two-line>
              <template v-for="(item, index) in builds">
                <v-list-tile :key="item._id" avatar router :to="{ name: 'buildDetails', params: { id: item._id }}" @click="">
                  <v-list-tile-avatar>
                    <v-icon>star</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{ item.vehicle.year }} {{item.vehicle.make}} {{item.vehicle.model}} 
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>

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
    user: state => state.user,
    builds: state => state.builds.builds,
    comments: state => state.comments
  }),
  created () {
    this.$store.dispatch('getBuilds', { params: { limit: 20 }})
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
