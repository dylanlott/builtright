<template lang="html">
  <v-container>
    <v-text-field>

    </v-text-field>
      
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { router } from '../router/index'

export default {
  name: 'AddPartForm',
  data () {
    return {
      part: {
        name: '',
        make: '',
        model: '',
        price: '',
        url: '',
        rating: ''
      }
    }
  },
  computed: mapState({
    user: state => state.user,
    details: state => state.details
  }),
  methods: {
    submit () {
      this.part.build_id = this.$route.params.id
      console.log(this.part)
      this.$store.dispatch('addPartToBuild', this.part)
      this.part =  {}
    }
  }
}
</script>

<style lang="stylus">
.addpart__form
  margin: 40px
</style>
