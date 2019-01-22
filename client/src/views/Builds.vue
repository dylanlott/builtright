<template>
  <v-container fluid>
    <Loader :loading="loading"></Loader>
    <v-layout row wrap justify-space-around>
      <v-flex xs12>
        <v-toolbar color="accent"></v-toolbar>
      </v-flex>
      <v-flex xs12>
        <v-card height="110">
          <v-card-text>
            <v-layout column>
              <v-flex xs12>
                <h3>Search <v-icon color="black">search</v-icon></h3>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                  v-model="search" 
                  value="Search builds..."
                  label="Try keywords like make, model, etc..."
                  v-on:keyup="searchBuilds"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>    
        </v-card>
      </v-flex>
      <!-- 
      <v-flex xs12 sm5 md5>
        <v-layout column> 
          <v-card>  
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
            </v-container>
          </v-card>
        </v-layout>
      </v-flex>
      -->
      <v-flex xs12> 
        <v-card>
          <BuildsList :builds="builds.builds" :loading="builds.loading"></BuildsList>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-btn block router :to="{ name: 'addBuild' }" large color="accent">
          <b>Start A Build</b>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-flex>
  </v-container>
</template>

<script>
import BuildsList from '../components/BuildsList.vue'
import Loader from '../components/Loader.vue'
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
    loading: state => state.builds.loading
  }),
  created () {
    this.$store.dispatch('getAllBuilds', 0)
  },
  methods: {
    searchBuilds () {
      if (this.search !== "") {
        this.$store.dispatch('searchBuilds', this.search)
      } else {
        this.$store.dispatch('getAllBuilds', 0)
      }
    }
  },
  components: { BuildsList, Loader }
}
</script>
<style media="screen" lang="stylus">
</style>
