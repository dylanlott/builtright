<template lang="html">
  <div class="content__bg">
    <v-container fluid>
      <v-layout column>
        <v-btn v-if="isOwner()" color="danger" router :to="{name: 'editBuild', params: {id: details._id}}">Edit</v-btn>
        <v-btn v-else color="info">Owned by {{ details._user.profile.firstName }} {{ details._user.profile.lastName }} {{ details._user.email }}</v-btn>
        <v-card>
          <v-card-media :src="details.display">
            <v-layout column class="media">
              <v-card-title class="headline"><h2>{{details.title}}</h2></v-card-title>
              <v-card-text class="left">
                {{details.vehicle.year}} {{details.vehicle.make}} {{details.vehicle.model}} {{details.vehicle.trim}}
              </v-card-text>
            </v-layout>
          </v-card-media>
        </v-card>

        <v-card v-if="details._parts.length > 0">
          <v-card-title><h2>Parts</h2></v-card-title>
          <v-list two-line>
            <v-list-tile v-for="item in details._parts" router :to="{ name: 'partDetails', params: { id: item._id }}">
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
          <v-card-actions>
            <v-btn router outline color="cyan" v-if="isOwner()" :to="{ name: 'addPart', params: { id: details._id }}">
              Add a part
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else>No parts have been added to this build yet</v-card>
    <!-- 
        <v-card>
          <v-card-title><h2>Stats</h2></v-card-title>
          <v-card-text>
            <v-btn @click="" color="accent">Add Stats</v-btn>
            <v-list dense v-if="details.stats">
              <v-list-tile >
                <v-list-tile-content>
                Horsepower
                </v-list-tile-content>
                <v-list-tile-content>
                  {{ details.stats.wheel_horsepower }} hp
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>
                Torque 
                </v-list-tile-content>
                <v-list-tile-content>
                  {{ details.stats.torque }} ft lb
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>
                0-60 time
                </v-list-tile-content>
                <v-list-tile-content>
                  {{ details.stats.zerotosixty }}
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>
                1/4 Mile
                </v-list-tile-content>
                <v-list-tile-content>
                  {{ details.stats.quarter_mile }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
        --> 
      </v-layout>

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
    isOwner: function () {
      const current = this.user.user_id
      const buildOwner = this.details._user._id
      if (current == buildOwner) return true
      return false
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
