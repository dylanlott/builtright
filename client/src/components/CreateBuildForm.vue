<template>
  <v-container class="builds">
    <v-card> 
      <h1 class="header">Create A New Build</h1>

      <v-container> 
        <v-text-field
          class="build__input"
          id="Build Name"
          name="Build Name"
          label="Build Name"
          v-model="build.title"
          required
        ></v-text-field>

        <v-text-field
          class="build__input"
          id="Build make"
          name="Build make"
          label="Build make"
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
          v-model="build.vehicle.year"
          required
        ></v-text-field>

        <v-text-field
          class="build__input"
          id="Build Trim"
          name="Build Trim"
          label="Build Trim"
          v-model="build.vehicle.trim"
          required
        ></v-text-field>

        <v-text-field
          class="build__input"
          id="Imgur"
          name="imgur"
          label="Imgur Link"
          :rules="urlRules"
          v-model="build.imgur"
        ></v-text-field>
      </v-container>
      <div>
        <v-btn 
          raised 
          @click.native='submit()' 
          class="build__btn">
            Create Build
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import user from '../api/user'
import { router } from '../router/index'
import { mapState } from 'vuex'
import url_validator from '../utils/url'

const storage = window.localStorage

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
      }
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

      console.log('valid? ', url_validator.test(this.build.imgur)); 

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
    
  .header
    color: charcoal

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
