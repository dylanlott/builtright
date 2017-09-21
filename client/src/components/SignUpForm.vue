<template lang="html">
  <div>
    <div class="form__signup well">
      <div class="inputs">
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
      </div>
      <v-btn primary class="button__signup" @click.native="submit()">
        Sign Up
      </v-btn>
      <p>
        Already a member? <a href="/login">Login</a>.
      </p>
    </div>
  </div>
</template>

<script>
import { router } from '../router'

export default {
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
  .form__signup
    width: 400px
    text-align: center
    margin: 0px auto
    margin-top: 40px
  .inputs
  .button__signup
    margin: 20px

</style>
