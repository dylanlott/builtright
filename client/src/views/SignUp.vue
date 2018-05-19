<template>
  <v-container>
    <v-layout column align-center>
      <v-flex xs12 sm6>
        <h1>Sign up for</h1>
        <img src="../static/img/logo-2color-horizontal.png" class="logo"/>
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

.logo
  height: 70px
  width: auto

  @media(max-width: 700px)
    width: 100%
    height: auto

.heading
  text-align: center
</style>
