<template>
  <v-container fluid>
    <v-layout row wrap justify-space-around>
      <v-flex xs12>
        <v-card height="90">
          <v-card-text>
            <v-text-field 
              v-model="search" 
              value="Search builds..."
              label="Search keywords like make, model, etc..."
              v-on:keyup="searchBuilds"
            ></v-text-field>
        </v-card-text>
        </v-card>
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
  </v-flex>
  </v-container>
</template>

<script>
import BuildsList from '../components/BuildsList.vue'
import { mapState } from 'vuex'
import constants from '../constants'
import _ from 'lodash'

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
      makes: constants.AUTO_MAKES,
      search: '',
      fab: null,
      top: false,
      bottom: true,
      right: true,
      left: false,
      transition: '',
      hover: true
    }
  },
  computed: mapState({
    user: state => state.user,
    builds: state => state.builds,
    loading: state => state.loading
  }),
  created () {
    this.$store.dispatch('getAllBuilds', 0)
  },
  methods: {
    searchBuilds () {
      console.log('HIT')
      console.log('search: ', this.search)
      this.$store.dispatch('searchBuilds', this.search)
    }
  },
  components: { BuildsList }
}
</script>
<style media="screen" lang="stylus">
</style>
