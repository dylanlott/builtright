<template lang="html">
  <v-bottom-nav value="true" class="hidden-sm-and-up grey darken-2 white--text">
    <v-btn @click.native="route('builds')" flat light class="white--text">
      <span>Builds</span>
      <v-icon>history</v-icon>
    </v-btn>
    <v-btn @click.native="route('posts')" flat light class="white--text">
      <span>Posts</span>
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn @click.native="route('profile')" flat light class="white--text">
      <span>Profile</span>
      <v-icon>place</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'BottomNav',
  methods: {
    route (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus">

</style>
