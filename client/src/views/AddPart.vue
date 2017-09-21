<template lang="html">
  <div>


    <v-card class="addpart__card">
      <v-card-text>
        <h2 class="title">Add A Part To This Build</h2>
      </v-card-text>
      <v-card-text class="subheading grey--text">
        Add a part to this build, show off what you've worked on.
      </v-card-text>
      <div class="addpart__form">
        <form>
          <v-card-row>
              <v-text-input
                id="partName"
                name="partName"
                label="Part Name"
                v-model="part.name"
              ></v-text-input>
          </v-card-row>
          <v-card-row>
            <v-text-input
              id="websiteURL"
              name="websiteURL"
              label="Website / URL to buy the part at"
              v-model="part.url"
            ></v-text-input>
          </v-card-row>
          <v-card-row>
            <v-text-input
              id="test2"
              name="test2"
              label="Part brand"
              v-model="part.brand"
            ></v-text-input>
          </v-card-row>
          <v-card-row>
            <v-text-input
              id="test2"
              name="test2"
              label="Part model"
              v-model="part.model"
            ></v-text-input>
          </v-card-row>
          <v-card-row>
            <v-text-input
              id="test2"
              name="test2"
              label="Price"
              v-model="part.price"
            ></v-text-input>
          </v-card-row>
        </form>
      </div>
      <v-card-row actions>
        <v-btn flat v-on:click.native="modal = false" class="gray--text">Cancel</v-btn>
        <v-btn raised success dark v-on:click.native="submit()" class="gray--text">Submit</v-btn>
      </v-card-row>
    </v-card>
  </div>
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
