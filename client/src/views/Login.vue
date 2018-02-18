<template>
  <v-container fluid grid-list-xl>
    <v-layout column>
      <h1>Login to BuiltRight</h1>
      <LoginForm></LoginForm>
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
      if (user.checkAuth()) {
        router.push('dashboard')
      }
    },
    components: { LoginForm }
  }
</script>

<style lang="stylus">
</style>
