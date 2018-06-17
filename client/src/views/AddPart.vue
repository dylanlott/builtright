<template lang="html">
  <v-layout column>
    <v-container>
      <v-card>
        <v-card-title><h1><v-icon style="font-size: 30px;" color="primary">add_circle</v-icon>Add a part</h1></v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Name / Title"
              v-model="part.title"
              required>
            </v-text-field>
            <v-text-field
              label="Description / Additional information"
              v-model="part.description"
              ></v-text-field>
            <v-text-field
              label="Brand / Make"
              v-model="part.make"
              required
            ></v-text-field>
            <v-text-field
              label="Model"
              v-model="part.model"
              required
              ></v-text-field>
            <v-select
              label="Type"
              v-model="part.type"
              :items="part_types"
              required
            ></v-select>
            <v-text-field
              label="Price"
              v-model="part.price"
              :rules="priceValidator"
              required
              ></v-text-field>
            <v-text-field 
              label="URL"
              v-model="part.url"
              :rules="urlValidator"
              ></v-text-field>
            <v-btn
              color="primary"
              @click.native="addPart(part)"
            >Add part</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { router } from '../router/index'
import constants from '../constants'

const types = constants.PART_TYPES

export default {
  name: 'AddPartForm',
  data () {
    return {
      priceValidator: [
        v => !!v,
        v => this.price_regex.test(v),
      ],
      urlValidator: [
        v => !!v,
        v => this.url_regex.test(v)
      ],
      part_types: [
        { text: types.forcedInduction },
        { text: types.suspension },
        { text: types.body },
        { text: types.engine },
        { text: types.transmission },
        { text: types.wheels },
        { text: types.exhaust },
        { text: types.electronics },
        { text: types.fuel },
        { text: types.ignition },
        { text: types.audio }
      ],
      price_regex: /\d+((,\d+)+)?(.\d+)?(.\d+)?(,\d+)?/,
      url_regex: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
      types_selector: null,
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
        type: part.type.text,
        price: parseFloat(part.price),
        trim: part.trim,
        data: {
          build: this.$route.params.id,
        },
        url: part.trim
      }

      const payload = {
        part: _part,
        build: this.details._id
      }

      console.log(payload)
        
      this.$store.dispatch('addPartToBuild', payload);
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
</style>
