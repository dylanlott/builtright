<template lang="html">
  <v-card class="ma-1">
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
            required
          ></v-text-field>
          <v-text-field
            id="ConfirmPassword"
            name="confirmpassword"
            type="password"
            label="Confirm Password"
            v-model="user.confirmPassword"
            required
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn dark primary @click.native="submit()">
            Sign Up
          </v-btn>
        </v-flex>
        <v-flex>
        Already a member? <a href="/login">Login</a>.
        </v-flex>
    </v-card-text>
  </v-card>
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

      var loginUser = {
        email: this.user.email,
        password: this.user.password
      }

      if (this.user.password === this.user.confirmPassword) {
        this.$store.dispatch('signup', user)
        this.$swal({
          type: 'success',
          title: 'Confirmed',
          text: 'Welcome to the BuiltRight community!'
        })
      }

      if (this.user.password !== this.user.confirmPassword)  {
        this.$swal({
          type: 'warning',
          title: 'Passwords must match.',
          text: 'Please re-enter your password'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
