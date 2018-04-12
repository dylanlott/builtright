<template>
  <v-container fluid> 
    <v-layout row wrap justify-space-around>
      <v-flex xs12>
        <v-tooltip top>
          <v-btn slot="activator" fab floating color="accent" router :to="{ name: 'addBuild' }" class="hidden-xs-only add__build">
            <v-icon class="white--text">add</v-icon>
          </v-btn>
          Add A Build
        </v-tooltip>
      </v-flex>
      <v-flex xs12 sm5 md5>
        <v-layout column> 
          <v-card> <!-- make this into a collapse panel --> 
            <v-toolbar color="grey darken-2" dark>
              <v-toolbar-title>Filters</v-toolbar-title>
            </v-toolbar>
            <v-container>
              <v-flex xs12>
                <v-select 
                  v-model="query.make" 
                  label="Make" 
                  :items="makes" 
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select 
                  v-model="query.model" 
                  label="Model">
                </v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="query.engine"
                  label="Engine"
                  ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="query.tags"
                  label="Tags"
                  ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="query.keywords"
                  label="Keywords (comma separated)"
                  ></v-text-field>
              </v-flex>
            </v-container>
          </v-card>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm7 md6> 
        <v-card>
          <BuildsList :builds="builds.builds" :loading="builds.loading"></BuildsList>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BuildsList from '../components/BuildsList.vue'
import { mapState } from 'vuex'
import constants from '../constants'

export default {
  data () {
    return {
      query: {
        limit: 50,
        skip: 0,
        make: null,
        model: null,
        engine: null,
        tags: null,
        keywords: null
      },
      makes: constants.AUTO_MAKES
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
</style>
