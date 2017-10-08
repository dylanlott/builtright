<template>
  <section>
    <v-parallax src="https://cdn.stocksnap.io/img-thumbs/960w/EVX6GW7PQ3.jpg" height="800">
      <v-layout
        column
        align-center
        justify-center
        class="white--text"
      >
        <h1 class="white--text mb-2 display-4 text-xs-center">BuiltRight</h1>
        <div class="display-1 mb-3 text-xs-center">The #1 project car community online</div>
        <router-link :to="{ name: 'signup' }">
          <v-btn class="cyan lighten-1 mt-5" dark large>
            Sign Up 
          </v-btn>
        </router-link>
      </v-layout>
    </v-parallax>
  </section>
</template>

<script>
export default {
  name: 'landing',
  components: { }
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
</style>
