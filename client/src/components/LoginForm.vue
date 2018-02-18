<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-flex>
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
            <v-btn 
              color="primary"
              @click.native="submit()">
              Login
            </v-btn>
        </v-flex>

        <v-flex>
          Not a member yet? <router-link :to="{ name: 'signup' }">
            <a href="#">Sign up here</a>.</router-link>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-container>
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
</style>
