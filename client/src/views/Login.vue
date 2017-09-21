<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 md4 offset-md4>
            <h1 class="text-xs-center">Login</h1>
            <h3>{{message}}</h3>
              <LoginForm></LoginForm>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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
