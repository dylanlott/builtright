<template>
  <v-container fluid class="main" style="padding: 0px;">
      <v-jumbotron src="https://cdn.stocksnap.io/img-thumbs/960w/EVX6GW7PQ3.jpg" class="header" dark>
        <v-container class="header" fill-height>
          <div class="header__overlay">
            <v-layout align-center>
              <v-flex xs12>
                <h3 class="display-3"><b>Welcome to BuiltRight</b></h3>
                <span class="subheading"><b>The #1 online project car community.</b></span>
                <v-divider class="my-3"></v-divider>
                <div class="title mb-3"><b>Join now and browse builds, follow other builders, and create your own portfolio of projects.</b></div>
                <v-btn large router to="signup" color="primary" class="mx-0"><b>Sign up</b></v-btn>
              </v-flex>
            </v-layout>
          </div>
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
          <v-card dark>
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
          <v-card dark>
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
          <v-card dark>
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
      <v-layout column justify-space-around>
        <v-flex>
          <h2>Follow the blog</h2>
          <p>
            Follow the Garage and get tutorials, how-to's, and guides on everything from engine building to bodywork to stancing your car.
          </p>
          <a target="_blank" href="https://blog.builtrightapp.com/" class="routerlink">
            <v-btn large color="accent darken-1">Go to the Garage</v-btn>
          </a>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import signup from '../components/SignUpForm.vue'

export default {
  name: 'landing',
  data () {
    return {
      gradient: 'to bottom, #F96E31, #E21515'
    }
  },
  components: { signup }
}
</script>

<style lang="stylus" scoped>
.header__overlay
  width: 100%
  height: 100%
  background-color: rgba(0,0,0, 0.4) !important

.header
  padding: 0px

.container
  max-width: 100%
</style>
