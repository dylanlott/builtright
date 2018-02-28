<template>
  <v-container>
    <v-layout column align-center>
      <v-flex xs12 sm6>
        <h1 class="white--text">Sign up for BuiltRight</h1>
        <SignUpForm></SignUpForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import SignUpForm from '../components/SignUpForm.vue'
  export default {
    name: 'signup',
    components: { SignUpForm }
  }
</script>

<style lang="stylus">
.tagline
  color: #fff

.heading
  text-align: center
</style>
