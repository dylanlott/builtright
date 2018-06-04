<template>
  <v-container>
    <v-layout column justify-space-around>
      <v-flex>
        <v-toolbar extended color="primary" dark>
          <v-toolbar-title><h1 class="display-2">Parts</h1></v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-list three-line subheader>
            <!-- <v-subheader>Parts</v-subheader>-->
            <v-list-tile v-for="part in parts" :key="part._id" router :to="{ name: 'partDetails', params: { id: part._id }}">
              <v-list-tile-content>
                <v-list-tile-title>{{ part.title }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ part.make }} {{ part.model }}
                </v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  {{ part.price | currency }} 
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'parts_list',
  data () {
    return {}
  },
  computed: mapState({
    parts: state => state.parts.parts
  }),
  created () {
    this.$store.dispatch('getParts')
  }
}
</script>
<style>

</style>
