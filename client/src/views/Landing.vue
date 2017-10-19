<template>
  <section>
    <div>
      <v-parallax src="https://cdn.stocksnap.io/img-thumbs/960w/EVX6GW7PQ3.jpg" height="800">
        <v-layout
          column
          align-center
          justify-center
          class="white--text"
        >
          <h1 class="white--text mb-2 display-4 text-xs-center">BuiltRight</h1>
          <div class="display-1 mb-3 text-xs-center">The #1 project car community online</div>
          <router-link class="router-link" :to="{ name: 'signup' }">
            <v-btn class="cyan lighten-1 mt-5" dark large>
              Sign Up
            </v-btn>
          </router-link>
        </v-layout>
      </v-parallax>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 px-3>
            <v-card height="300px" dark color="primary">
              <v-card-text class="px-3">
                <v-icon class="white--text benefits-icon">question_answer</v-icon>
                <h1>Ask Questions</h1>
                <p>Get feedback on your builds, answers to technical questions, and expert advice at every turn.</p>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 px-3>
            <v-card height="300px" dark color="primary">
              <v-card-text class="px-3">
                <v-icon class="white--text benefits-icon">settings</v-icon>
                <h1>Show Off Your Build</h1>
                <p>Post what parts you've installed, your horsepower numbers, and your planned upgrades.</p>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 px-3>
            <v-card height="300px" dark color="primary">
              <v-card-text class="px-3">
                <v-icon class="white--text benefits-icon">explore</v-icon>
                <h1>Get Inspiration</h1>
                <p>Look at other builds, find new parts, and get ideas for your next builds.</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout class="text-xs-center">
          <signup></signup>
        </v-layout>

      </v-container>
    </div>
  </section>
</template>

<script>
import signup from '../components/SignUpForm.vue'

export default {
  name: 'landing',
  components: { signup }
}
</script>

<style lang="stylus">
.header__img
  margin-top: -14px
  margin-bottom: 30px
  width: 100%
  z-index: -999

.header__container
  width: 100%

.tagline
  color: #fff

.router-link
  text-decoration: none

.benefits-icon
  font-size: 72px
  margin: 20px
</style>
