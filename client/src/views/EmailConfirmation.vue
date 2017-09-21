<template lang="html">
  <div class="email-confirm">
    <h3>Thanks for signing up!</h3>
    <p>You should be receiving a confirmation email from us shortly.</p>
    <p>Be sure to surf our forums or check out other builds in the meantime.</p>

    <router-link class="router-link" :to="{ name: 'forum' }">
      <v-btn primary large>
        Forums
      </v-btn>
    </router-link>
    <router-link class="router-link" :to="{ name: 'builds' }">
      <v-btn primary large>
        Builds
      </v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus">
.router-link
  text-decoration: none
</style>
