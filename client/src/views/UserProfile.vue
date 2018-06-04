<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <h1>User Profile and Settings</h1>
          </v-card-title>
          <v-card-text>
            {{ user.email }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'userProfile',
  computed: mapState({
    user: state => state.user
  }),
  created () {
    this.$store.dispatch('getUserInfo', this.user.user_id)
  }
}
</script>

<style lang="stylus">

</style>
