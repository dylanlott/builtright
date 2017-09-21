<template lang="html">
  <v-bottom-nav value="true" class="hidden-sm-and-up grey darken-2 white--text">
    <v-btn flat light class="white--text">
      <span>Recents</span>
      <v-icon>history</v-icon>
    </v-btn>
    <v-btn flat light class="white--text">
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn flat light class="white--text">
      <span>Nearby</span>
      <v-icon>place</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'BottomNav'
}
</script>

<style lang="stylus">
</style>
