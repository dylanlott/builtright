<template>
  <v-container fluid> 
    <v-layout row wrap justify-space-around>
      <v-flex xs12>
        <v-btn color="accent" router :to="{ name: 'addBuild' }" class="hidden-xs-only">
          <v-icon class="white--text">add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm5 md5>
        <v-layout column> 
          <v-card> <!-- make this into a collapse panel --> 
            <v-card-title><h3>Filters</h3></v-card-title>
            <v-flex xs12>
              <v-select label="Make"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select label="Model"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                  label="Engine"
                  ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                  label="Class"
                  ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                  label="Price"
                  ></v-select>
            </v-flex>
          </v-card>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm7 md6> 
        <v-card>
          <v-card-title><h3>Builds</h3></v-card-title>
          <BuildsList :builds="builds.builds" :loading="builds.loading"></BuildsList>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
