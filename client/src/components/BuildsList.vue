<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Builds</v-toolbar-title>
      </v-toolbar>
      <v-list two-line>
        <template v-for="(build, index) in builds">
          <v-list-tile
            avatar
            ripple
            router
            :to="{ name: 'buildDetails', params: { id: build._id }}"
            :key="build.title"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ build.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ build.vehicle.make }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { router } from '../router/index'

const storage = window.localStorage

export default {
  name: 'buildsList',
  props: [
    'builds',
    'loading'
  ]
}
</script>

<style lang="stylus">
  .build__cards
    margin: 40px 20px
  .router
    text-decoration: none
  .left
    text-align: left
</style>
