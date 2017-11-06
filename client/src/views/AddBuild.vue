<template>
  <v-layout row wrap class="p-2">
    <v-flex xs12>
      <v-container>
        <v-card-text>
          <CreateBuildForm></CreateBuildForm>
        </v-card-text>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import CreateBuildForm from '../components/CreateBuildForm.vue'
export default {
  name: 'addBuild',
  data () {
    return {}
  },
  components: { CreateBuildForm }
}
</script>
<style lange="stylus">

</style>
