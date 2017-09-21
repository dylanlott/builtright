<template lang="html">
    <div class="alerts">
        <div v-for="alert in alerts">{{message}}</div>
    </div>
</template>

<script>
export default {
  name: 'AlertSystem',
  data () {
    return {
      alerts: []
    }
  },
  computed () {

  },
  mounted () {

  }
}
</script>

<style lang="css">
</style>
