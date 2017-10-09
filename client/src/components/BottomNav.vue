<template lang="html">
  <v-card> 
    <v-bottom-nav :value="true" class="hidden-sm-and-up grey darken-2 white--text">
      <v-btn @click.native="route('builds')" flat light class="white--text">
        <span>Builds</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn @click.native="route('posts')" flat light class="white--text">
        <span>Posts</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn v-if="user" @click.native="route('profile')" flat light class="white--text">
        <span>Profile</span>
        <v-icon>place</v-icon>
      </v-btn>
      <v-btn v-if="!user" @click.native="route('login')" flat light class="white--text">
        <span>Sign In</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  name: 'BottomNav',
  props: ['user'],
  methods: {
    route (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus">

</style>
