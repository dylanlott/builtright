<template>
  <v-container class="builds">
    <v-text-field
      class="build__input"
      id="Build Name"
      name="Build Name"
      label="Build Name"
      v-model="build.title"
      :rules="length"
      required
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Build make"
      name="Build Make"
      label="Build Make"
      v-model="build.vehicle.make"
      required
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Build Model"
      name="Build Model"
      label="Build Model"
      v-model="build.vehicle.model"
      required
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Build Year"
      name="Build Year"
      label="Build Year"
      :rules="yearRules"
      v-model="build.vehicle.year"
      required
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Build Trim"
      name="Build Trim"
      label="Build Trim"
      v-model="build.vehicle.trim"
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Imgur"
      name="imgur"
      label="Imgur Link"
      v-model="build.imgur"
    ></v-text-field>
    <div>
      <v-btn 
        raised 
        color="primary"
        @click.native='submit()' 
        class="build__btn">
          Create Build
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import user from '../api/user'
import { router } from '../router/index'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      build: {
        title: '',
        vehicle: {
          make: '',
          model: '',
          year: '',
          trim: ''
        }
      },
      yearRules: [
        v => v.length === 4 || 'Year must be 4 digits',
      ],
      length: [
        v => v.length <= 60 || 'Title must be less than 60 characters'
      ]
    }
  },
  computed: mapState({
    user: state => state.user 
  }),
  methods: {
    submit: function () {
      const build = {
        title: this.build.title,
        vehicle: this.build.vehicle,
        _user: this.user.user_id
      }

      this.$store.dispatch('createNewBuild', build)
      router.push({ name: 'builds'})
    }
  }
}
</script>

<style lang="stylus">
@import '../css/theme.styl'
  .builds
    margin-top: 20px
    
  .input-group label
    color: light-blue

  .build__input
    color: blue

  label
    color: blue

  .build__btn
    background-color: orange
    color: white
</style>
