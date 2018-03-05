<template>
  <v-layout row justify-space-around wrap class="p-2">
    <v-flex xs12 sm6>
      <v-container>
        <v-card>
            <CreateBuildForm></CreateBuildForm>
        </v-card>
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
