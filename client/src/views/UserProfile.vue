<template>
  <v-container fluid>
    <v-card class="grey darken-3 white--text">
      <v-card-row>
        <v-card-title >
          {{ user.user_id }}
        </v-card-title>
      </v-card-row>
      <v-card-row>
        <v-btn class="orange white--text">Reset Password</v-btn>
      </v-card-row>
      <v-card-row>
        <v-btn class="red white--text">Delete Account</v-btn>
      </v-card-row>
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
    console.log('this._id: ', this.user._id)
    this.$store.dispatch('getUserInfo', this.user._id)
  }
}
</script>

<style lang="stylus">
.header
  color: charcoal

.profile
  margin-top: -20px
</style>
