<template>
  <v-container>
    <h1>Admin Dashboard</h1>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { router } from '../router'

export default {
  name: 'admin',
  data () {
    return {}
  },
  computed: mapState({
    user: state => state.user,
    admin: state => state.admin
  }),
  created () {
    
  },
  beforeCreated () {
    this.$store.dispatch('checkRole', this.user.user_id, 'admin') 
  }
}
</script>

<style>

</style>
