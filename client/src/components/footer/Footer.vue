<template>
  <v-footer class="app__footer" transition="slide-y-transition">
    <div>Hivemind Apps ©</div>
    <v-spacer></v-spacer>
    <div>{{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style lang="stylus">
  .app__footer
    padding: 0px 10px
</style>
