<template lang="html">
  <v-card>
    <v-container> 
      <h1>Add a part</h1>
      <v-text-field
        label="Title"
        v-model="part.title"
      ></v-text-field>
      <v-text-field
        label="Description"
        v-model="part.description"
      ></v-text-field>
      <v-text-field
        label="Make"
        v-model="part.make"
      ></v-text-field>

      <v-text-field
        label="Model"
        v-model="part.model"
      ></v-text-field>

      <v-text-field
        label="Type"
        v-model="part.type"
      ></v-text-field>

      <v-text-field
        label="Price"
        v-model="part.price"
      ></v-text-field>
      <v-text-field
        label="Trim"
        v-model="part.trim"
      ></v-text-field>
      <v-text-field
        label="URL"
        v-model="part.url"
      ></v-text-field>

      <v-btn primary
        @click.native="submit">
        Submit
      </v-btn>
    </v-container>
  </v-card> 
</template>

<script>
import { mapState } from 'vuex'
import { router } from '../router/index'
export default {
  name: 'AddPartForm',
  data () {
    return {
      part: {
        title: '',
        description: '',
        make: '',
        model: '',
        type: '',
        price: '',
        trim: '',
        data: {},
        options: [],
        url: ''
      }
    }
  },
  computed: mapState({
    user: state => state.user,
    details: state => state.details
  }),
  methods: {
    submit () {
      this.part.data.build = this.$route.params.id;
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
