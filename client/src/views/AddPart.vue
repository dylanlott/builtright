<template lang="html">
  <v-layout column>
    <v-card>
      <v-card-title class="text-center">
        <h1>{{ this.details.title }}</h1>
      </v-card-title>
      <v-container> 
        <form v-model="part"> 
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
        </form>
        <v-btn primary
          @click.native="addPart(part)">
          Submit
        </v-btn>
      </v-container>
    </v-card> 
  </v-layout>
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
    details: state => state.builds.details
  }),
  methods: {
    addPart (part) {
      const _part = {
        title: part.title,
        description: part.description,
        make: part.make,
        model: part.model,
        type: part.type,
        price: part.price,
        trim: part.trim,
        data: {
          build: this.$route.params.id,
        },
        url: part.trim
      }

      console.log(_part)

      this.$store.dispatch('addPartToBuild', _part);
      this.part = {}
      router.push({ 
        name: 'buildDetails', 
        params: { id: this.$route.params.id }
      })
    }
  }
}
</script>

<style lang="stylus">
.addpart__form
  margin: 40px
</style>
