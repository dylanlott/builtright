<template lang="html">
  <div class="content__bg">
    <div class="secondary__nav">
      Dashboard / Builds / Info
    </div>

    <v-btn floating class="orange floating">
      <v-icon light>add</v-icon>
    </v-btn>

    <v-card class="details__card">
      <v-card-text>
        <code>{{ details }}</code>
      </v-card-text>
    </v-card>

    <v-card class="details__card">
      <v-card-title>Parts</v-card-title>
      <v-card-text>

      </v-card-text>
    </v-card>

    <v-card class="details__card">
      <v-card-title>Comments</v-card-title>
       <v-card-text>
       </v-card-text>
     </v-card>

  </div>
</template>

<script>
import { router } from '../router/index'
import { mapState } from 'vuex'

export default {
  name: 'buildDetails',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: mapState({
    details: state => state.builds.details,
    parts: state => state.builds.parts,
    user: state => state.user
  }),
  created () {
    this.$store.dispatch('getBuildDetails', this.$route.params.id)
  },
  methods: {
    addPart: function () {
      this.$store.dispatch('addPart', this.part, this.details, this.details.id)
    }
  }
}
</script>

<style lang="stylus">
@import '../css/theme.styl'

.floating
  position: absolute
  top: 120px
  right: 20px

// .content__bg
  // background-color: blue

.details__card
  margin: 20px 20px

.actions__btn
  margin: 10px 10px
</style>
