<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ user.email }}
      </v-card-title>

      <v-card-content> 
        
      </v-card-content> 
    </v-card>
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
