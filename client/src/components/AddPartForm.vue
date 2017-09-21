<template lang="html">
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
            <v-text-field
              id="partName"
              name="partName"
              label="Part Name"
              v-model="part.name"
            ></v-text-field>
        </v-card-row>
        <v-card-row>
          <v-text-field
            id="websiteURL"
            name="websiteURL"
            label="Website / URL to buy the part at"
            v-model="part.url"
          ></v-text-field>
        </v-card-row>
        <v-card-row>
          <v-text-field
            id="test2"
            name="test2"
            label="Part brand"
            v-model="part.brand"
          ></v-text-field>
        </v-card-row>
        <v-card-row>
          <v-text-field
            id="test2"
            name="test2"
            label="Part model"
            v-model="part.model"
          ></v-text-field>
        </v-card-row>
        <v-card-row>
          <v-text-field
            id="test2"
            name="test2"
            label="Price"
            v-model="part.price"
          ></v-text-field>
        </v-card-row>
        </form>
      </div>
      <v-card-row actions>
        <v-btn flat v-on:click.native="modal = false" class="primary--text">Cancel</v-btn>
        <v-btn flat v-on:click.native="modal = false" class="primary--text">Submit</v-btn>
      </v-card-row>
    </v-card>
</template>

<script>
import { router } from '../router/index'
import { mapDispatch } from 'vuex'

export default {
  data () {
    return {
      modal: false,
      part: {
        name: ''
      }
    }
  },
  methods: {
    addPart: function () {
      console.log('ADD PART')
    },
    closeModal: function () {
      this.modal = false
    }
  }
}
</script>

<style lang="stylus">
@import '../css/theme.styl'

</style>
