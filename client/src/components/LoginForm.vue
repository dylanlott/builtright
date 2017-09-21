<template>
  <div>
    <div class="well">
      <form class="" action="submit" @keyup.enter="submit()">
        <v-text-field
          id="Email"
          name="Email"
          label="Email"
          v-model="user.email"

          prepend-icon="account_circle"
          required
        ></v-text-field>
        <v-text-field
          id="Password"
          name="Password"
          type="password"
          label="Password"
          v-model="user.password"
          min="8"
          prepend-icon="lock"
          required
        ></v-text-field>
        <div>
          <v-btn name="loginsubmit" raised primary class="button__login"
          @click.native="submit()">Login</v-btn>
          <p>Not a member yet? <router-link :to="{ name: 'signup' }">
            <a href="#">Sign up here</a>.</router-link></p>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      isValid: false
    }
  },
  methods: {
    submit () {
      var user = {
        email: this.user.email,
        password: this.user.password
      }
      this.$store.dispatch('loginUser', user)
    }
  }
}
</script>

<style lang="stylus">
  .well {
    background: #eee
    padding: 40px
  }
  .button__login {
    margin: 20px
  }
</style>
