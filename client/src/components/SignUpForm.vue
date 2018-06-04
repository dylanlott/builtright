<template lang="html">
  <div>
    <v-card class="ma-1">
      <v-toolbar card dark color="primary">
        <v-toolbar-title>Setup your account</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-flex>
            <v-text-field
              id="DisplayName"
              name="displayname"
              type="text"
              label="Display Name"
              v-model="user.displayName"
              required
            ></v-text-field>
            <v-text-field
              id="Email"
              name="Email"
              label="Email"
              v-model="user.email"
              required
            ></v-text-field>
            <v-text-field
              id="Password"
              name="Password"
              type="password"
              label="Password"
              v-model="user.password"
              @keyup.enter="submit()"
              required
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-btn dark primary @keyup.enter="submit()" @click.native="submit()">
              Sign Up
            </v-btn>
          </v-flex>
          <v-flex>
            Already a member? <router-link :to="{ name: 'login' }">Login.</router-link>
          </v-flex>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { router } from '../router'

export default {
  name: 'signup',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      var user = {
        email: this.user.email,
        password: this.user.password,
        displayName: this.user.displayName
      }

      this.$store.dispatch('signup', user) 
      this.$ga.event({
        eventCategory: 'users',
        eventAction: 'sign up',
        eventLabel: 'app',
        eventValue: 0
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
