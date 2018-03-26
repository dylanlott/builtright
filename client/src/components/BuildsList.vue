<template>
  <v-flex>
    <v-container padding>
      <div v-if="loading">Loading...</div>
      <v-card v-if="!builds">
        <v-card-text>We didn't find any builds. :(</v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <v-card v-for="build in builds">
          <v-flex xs12>
            <v-card dark class="primary white--text">
              <v-card-title primary-title>
                <div class="headline" v-text="build.title"></div>
                <div></div>
              </v-card-title>
              <v-card-text class="left">
                <div class="light-2" v-text="build.vehicle.make"></div>
              </v-card-text>
              <v-card-actions>
                <v-btn flat dark router :to="{ name: 'buildDetails', params: { id: build.slug }}"> View details
                  <v-icon>details</v-icon> 
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
      </v-card> 
    </v-container>
  </v-flex>
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
