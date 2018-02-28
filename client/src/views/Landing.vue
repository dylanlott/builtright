<template>
  <v-container fluid class="main">
    <v-jumbotron color="grey">
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
    <v-container>
      <v-layout justify-center>
        <v-flex xs8>
          <h2>What is BuiltRight?</h2>
          <p>BuiltRight is the #1 online community for DIY car enthusiasts. Whether it's a drift car, an old restoration project, or a rat-rod, there's a community on BuiltRight for you.</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout row wrap justify-space-around>
        <v-flex xs12 sm3>
          <v-card dark color="primary">
            <v-card-text>
              <div>
                <h3>Post Your Build</h3>
                <v-icon size="60px">settings</v-icon>
              </div>
              You've been wrenching on that build in the shop for years, why not show it off? Post your build, add parts, and upload photos of it. 
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card dark color="secondary">
            <v-card-text>
              <div>
                <h3>Find Parts</h3>
                <v-icon size="60px">build</v-icon>
              </div>
              Find parts for your own builds, browse others for inspiration, and get ideas for your next project.
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card dark color="accent">
            <v-card-text>
              <div>
                <h3>Join the Community</h3>
                <v-icon size="60px">person</v-icon>
              </div>
              Post in the forums and talk about your current project, ask questions, get advice, and talk shop with the rest of the community.
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
</style>
