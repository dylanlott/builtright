<template lang="html">
  <div class="content__bg">
    <div class="secondary__nav">
      Dashboard / Builds / Info 
    </div>

    <v-container>
      <v-card>
        <v-card-media :src="details.display">
          <v-layout column class="media">
            <v-card-title class="headline white--text">{{details.title}}</v-card-title> 
            <v-card-text class="white--text left">
              {{details.vehicle.year}} {{details.vehicle.make}} {{details.vehicle.model}} {{details.vehicle.trim}}
            </v-card-text>
          </v-layout>
        </v-card-media>
      </v-card>

      <v-card v-if="details._parts.length > 0">
        <v-list two-line>
          <v-list-tile v-for="item in details._parts" @click="">
            <v-list-tile-action>
              <v-icon class="darkgrey--text">settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              <v-list-tile-sub-title>
                {{ item.make }} {{item.model}} {{item.trim}}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>${{item.price}}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-text="item.type"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
     
      <v-card>
        <v-card-title class="headline">Stats</v-card-title>
        <v-card-text>Total Cost of Build: </v-card-text>
        <v-card-text>0 - 60mph time: </v-card-text>
        <v-card-text>Horsepower: </v-card-text>
        <v-card-text>Torque: </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline">Comments</v-card-title>
        <v-card-text>
          <div v-if="details._comments.length < 1">No comments to display at this time.</div>
        </v-card-text>
      </v-card>
    </v-container>
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
    calculateTotal: function () {
      this.details._parts.reduce(function(acc, curr) {
        return acc + curr;
      });
    },
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

.details__card
  margin: 20px 20px

.actions__btn
  margin: 10px 10px

.left
  text-align: left
</style>
