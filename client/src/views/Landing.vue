<template>
  <v-container fluid class="main">
    <v-jumbotron color="grey" src="https://cdn.stocksnap.io/img-thumbs/960w/EVX6GW7PQ3.jpg">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">Welcome to BuiltRight</h3>
            <span class="subheading">The #1 online project car community.</span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3">Join now and browse builds, follow other builders, and create your own portfolio of projects.</div>
            <v-btn large router to="signup" color="primary" class="mx-0">Sign up</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </v-container>
</template>

<script>
import signup from '../components/SignUpForm.vue'

export default {
  name: 'landing',
  components: { signup }
}
</script>

<style lang="stylus">
.main
  padding: 0px;
  background-image: url('https://cdn.stocksnap.io/img-thumbs/960w/EVX6GW7PQ3.jpg');
</style>
