<template lang="html">
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          <span class="white--text">{{ details.title }}</span>
          <v-spacer></v-spacer>
          <div>
            <v-menu id="post-menu" bottom left origin="top right">
              <v-btn icon="icon" slot="activator" class="white--text">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list two-link>
                <v-list-tile>
                  <v-list-tile-title>Report this post</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>Delete this post</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>Save this post</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </v-card-title>

        <v-card-text>
          <v-layout>
            <v-card-text class="text-left">
              <div>{{ details.body }}</div>
            </v-card-text>
          </v-layout>
        </v-card-text>

        <CommentList :comments="details._comments"></CommentList>
        <AddComment></AddComment>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import CommentList from '../components/CommentList.vue'
import AddComment from '../components/AddComment.vue'

export default {
  computed: mapState({
    user: state => state.user,
    details: state => state.posts.postDetails
  }),
  created () {
    this.$store.dispatch('getPostDetails', this.$route.params.id)
  },
  components: {CommentList, AddComment}
}
</script>

<style lang="stylus">
</style>
