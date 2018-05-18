<template>
  <div >
    <v-snackbar
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      :top="snackbar.top"
      :vertical="snackbar.mode"
      v-model="snackbar.snackbar"
      > {{ snackbar.text }}</v-snackbar>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'alerts',
  computed: mapState({
    snackbar: state => state.alerts.snackbar
  })
}
</script>
<style></style>
