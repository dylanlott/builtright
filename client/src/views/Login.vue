<template>
  <v-container>
    <v-layout column align-center>
      <v-flex md6 xs12>
        <h1>Login to BuiltRight</h1>
        <img src="../static/img/logo-2color-horizontal.png" class="logo"/>
        <LoginForm></LoginForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import user from '../api/user'
import {router} from '../router/index.js'

  export default {
    name: 'login',
    data () {
      return {
        message: 'Login to BuiltRight'
      }
    },
    created () {
      if (user.checkAuth()) return router.push('dashboard')
    },
    components: { LoginForm }
  }
</script>

<style lang="stylus">
.logo
  width: 100%
</style>
