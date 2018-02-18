<template>
  <div style="padding: 20px;">
    <v-layout column wrap>
      <v-flex xs12>
        <h1 class="white--text">Sign up for BuiltRight</h1>
        <SignUpForm></SignUpForm>
      </v-flex>
    </v-layout>
</div>
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
