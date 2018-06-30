<template>
  <v-layout align-center justify-space-around wrap class="pa-2">
    <v-flex xs12>
      <v-container>
        <v-card>
          <h3 class="display-2"><v-icon size="36px">settings</v-icon> Add a build</h3>
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
