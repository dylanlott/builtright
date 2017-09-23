<template>
  <div>
    <v-container>
      <h2>App Information</h2>
    </v-container>
    <v-layout row wrap>  
      <v-flex xs12>
        <v-card> 
          <v-card-text>
            <code>{{ app }}</code>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'

export default {
  data () {
    return {
      app: undefined 
    }
  },
  created () {
    return axios.get(`${config.API_URL}/api`)
      .then(res => this.app = res.data)
      .catch((err) => console.error('Error getting API information'))
  }
}
</script>

<style media="screen" lang="stylus">
</style>
