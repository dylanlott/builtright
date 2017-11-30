<template lang="html">
  <div class="content__bg">
    <div class="secondary__nav">
      <router-link :to="{ name: 'dashboard' }">Dashboard</router-link> / 
      <router-link :to="{ name: 'builds' }">Builds</router-link> /
      {{ details.title }}
    </div>
   
    <router-link class="routerlink" v-if="details._user._id === user.user_id" :to="{ name: 'addPart' }">
      <v-btn class="cyan white--text"> 
        Add a part
      </v-btn>
    </router-link>

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
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
     
      <v-card>
        <v-card-title class="headline">Stats</v-card-title>
        <v-card-text>
          <span>Total cost: </span>
          <span>0 - 60mph time:</span>
          <span>Horsepower: </span>
          <span>Torque: </span>
        </v-card-text>
      </v-card>

      <v-card>
        <CommentList :comments="comments"></CommentList>
      </v-card>
      <v-card>
        <AddComment 
          :source_id="details._id"
          resource="builds"
          update="getBuildDetails"
        >
        </AddComment>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { router } from '../router/index'
import { mapState } from 'vuex'
import CommentList from '../components/CommentList.vue'
import AddComment from '../components/AddComment.vue'

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
    comments: state => state.builds.details._comments,
    user: state => state.user
  }),
  created () {
    this.$store.dispatch('getBuildDetails', this.$route.params.id)
  },
  components: {
    CommentList,
    AddComment
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

.routerlink
  text-decoration: none
</style>
